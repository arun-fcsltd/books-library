<template>
    <div class="max-w-2xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="pi pi-book text-blue-500"></i> {{ form.id ? "Edit Book" : "Add Book" }}
        </h2>

        <!-- Title -->
        <InputGroup>
            <InputGroupAddon><i class="pi pi-tag text-gray-500"></i></InputGroupAddon>
            <InputText v-model="form.title" placeholder="Enter book title" class="w-full" />
        </InputGroup>
        <small class="text-rose-500" v-if="errors.title">{{ errors.title }}</small>

        <!-- Author -->
        <InputGroup>
            <InputGroupAddon><i class="pi pi-user text-gray-500"></i></InputGroupAddon>
            <InputText v-model="form.author_name" placeholder="Enter author name" class="w-full" />
        </InputGroup>
        <small class="text-rose-500" v-if="errors.author_name">{{ errors.author_name }}</small>

        <!-- Description -->
        <InputTextarea v-model="form.description" rows="3" placeholder="Enter book description" class="w-full" />

        <!-- Genre -->
        <MultiSelect v-model="form.genre" :options="booksCategories" optionLabel="name" optionValue="code" showClear filter
            placeholder="Select genres" class="w-full" />

        <!-- Tags -->
        <InputText v-model="form.tags" placeholder="Enter tags, comma separated" class="w-full" />

        <!-- Thumbnail -->
        <MyUploader
            v-model="form.thumbnail"
            :deleteApi="null"
            uploadUrl="/api/fileupload"
            :multiple="false"
            accept="image/*"
          />

        <!-- Images -->
       <MyUploader
            v-model="form.images"
            :deleteApi="null"
            uploadUrl="/api/fileupload"
            :multiple="true"
            accept="image/*"
          />

        <!-- Price -->
        <InputNumber v-model="form.price" mode="decimal" minFractionDigits="0" maxFractionDigits="2"
            placeholder="Enter price" class="w-full" />

             <DatePicker
          v-model="form.published_date"
          class="w-full"
          placeholder="Select date"
        />

        <!-- Buttons -->
        <div class="flex justify-end gap-3 mt-4">
            <Button label="Cancel" severity="secondary" outlined @click="$router.back()" />
            <Button label="Save" icon="pi pi-check" @click="submitForm" />
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute, useRouter, useSupabaseClient } from "#imports";
import MultiSelect from "primevue/multiselect";
import MyUploader from "~/components/MyUploader.vue";
import DatePicker from 'primevue/datepicker';


const route = useRoute();
const router = useRouter();
const client = useSupabaseClient();

const booksCategories = ref([
    { name: "Fiction", code: "Fiction" },
    { name: "Non-Fiction", code: "Non-Fiction" },
    { name: "Romance", code: "Romance" },
    { name: "Fantasy", code: "Fantasy" },
]);

// Reactive form
const form = reactive({
    id: route.params.id || null,
    title: "",
    author_name: "",
    description: "",
    genre: [],
    thumbnail: "",
    images: "", // will split by comma
    price: 0,
    tags: "",
    published_date: "",
});

// Errors
const errors = reactive({
    title: "",
    author_name: "",
});

// Fetch book categories
const getBooksCategories = async () => {
    const { data, error } = await client.from("books_categories").select();
    if (error) console.error("Supabase categories error:", error);
    else booksCategories.value = data;
};

// Fetch book data if editing
const fetchBook = async () => {
    if (!route.params.slug) return;

    const res = await fetch(`/api/books?slug=${route.params.slug}`);
    const data = await res.json();

    if (data) {
        form.title = data.title || "";
        form.author_name = data.author_name || "";
        form.description = data.description || "";
        form.price = data.price || 0;
        form.thumbnail = data.thumbnail || "";
        // Map genre strings to booksCategories objects' code values
        form.genre = data.genre ? JSON.parse(data.genre).filter(genre =>  booksCategories.value.some(category => category.code === genre)
        ) : [];
        form.images = data.images || [];
        form.tags = data.tags || "";
        form.published_date = data.published_date || "";
    }
};

// Submit form
const submitForm = async () => {
    // Validate
    errors.title = "";
    errors.author_name = "";
    if (!form.title) errors.title = "Title is required";
    if (!form.author_name) errors.author_name = "Author is required";
    if (errors.title || errors.author_name) return;

    // Prepare payload
    const payload = {
        ...form,
        genre: JSON.stringify(form.genre), // Store as string array
        thumbnail: form.thumbnail,
        images: form.images,
    };

    const res = await fetch("/api/books", {
        method: form.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.id) router.push(`/dashboard/books/${data.id}`);
};

onMounted(() => {
    getBooksCategories();
    fetchBook();
});
</script>