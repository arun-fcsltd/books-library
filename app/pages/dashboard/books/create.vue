<template>
    <div class="max-w-2xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="pi pi-book text-blue-500"></i> Add Book
        </h2>

        <!-- Title -->
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-tag text-gray-500"></i>
            </InputGroupAddon>
            <InputText v-model="form.title" placeholder="Enter book title" class="w-full" />
        </InputGroup>
        <small class="text-rose-500" v-if="errors.title">{{ errors.title }}</small>

        <!-- Author -->
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user text-gray-500"></i>
            </InputGroupAddon>
            <InputText v-model="form.author_name" placeholder="Enter author name" class="w-full" />
        </InputGroup>
        <small class="text-rose-500" v-if="errors.author_name">{{ errors.author_name }}</small>

        <!-- Description -->
        <Textarea v-model="form.description" rows="3" placeholder="Enter book description" class="w-full" />

        <!-- Genre -->
        <MultiSelect v-model="form.genre" showClear :options="booksCategories" optionLabel="name" filter
            placeholder="Select Tags" :maxSelectedLabels="3" class="w-full" />

        <InputText v-model="form.tags" placeholder="Enter tags, comma separated" class="w-full" />

        <!-- <InputText v-model="form.genre" placeholder="Enter genre" class="w-full" /> -->

        <!-- Thumbnail URL -->
        <MyUploader v-model="form.thumbnail" :deleteApi="null" uploadUrl="/api/fileupload" :multiple="false"
            accept="image/*" />

        <!-- Images (comma-separated) -->
        <MyUploader v-model="form.images" :deleteApi="null" uploadUrl="/api/fileupload" :multiple="true"
            accept="image/*" />

        <!-- Price -->
        <InputNumber v-model="form.price" mode="decimal" :minFractionDigits="0" :maxFractionDigits="2"
            placeholder="Enter price" class="w-full" />


        <div class="card flex justify-center">

        </div>
        <!-- Action Buttons -->
        <div class="flex justify-end gap-3 mt-4">
            <Button label="Cancel" severity="secondary" outlined class="p-button-sm" @click="$router.back()" />
            <Button label="Save" icon="pi pi-check" class="p-button-sm" @click="submitForm" />
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import MultiSelect from 'primevue/multiselect';
import MyUploader from "~/components/MyUploader.vue";
import Textarea from 'primevue/textarea';

import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';


import { ref } from "vue";

const client = useSupabaseClient()


// const selectedCities = ref();
const booksCategories = ref();

const getBooksCategories = async () => {
    const { data, error } = await client.from("books_categories").select()
    if (error) {
        console.log(error);
    } else {
        booksCategories.value = data;
    }
    
};

 onMounted(() => {
    getBooksCategories();
})


const form = reactive({
    title: "",
    author_name: "",
    description: "",
    genre: [],
    thumbnail: "",
    images: "", // will split by comma
    price: 0,
    tags: "", /// will convert to JSON array
});

const errors = reactive({
    title: "",
    author_name: "",
});

const submitForm = async () => {
    // Reset errors
    errors.title = "";
    errors.author_name = "";

    // Validation
    // let isValid = true;
    // if (!form.title) {
    //     errors.title = "Title is required";
    //     isValid = false;
    // }
    // if (!form.author_name) {
    //     errors.author_name = "Author name is required";
    //     isValid = false;
    // }
    // if (!isValid) return;

    // Prepare images array
    // const imagesArray = form.images
    //     ? form.images.split(",").map((img) => img.trim())
    //     : [];

    // Prepare tags array
    const categoriesArray = form.genre
        ? form.genre.map(tag => tag.code)
        : [];


        console.log(form.thumbnail);


    // Submit to API
    const response = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: form.title,
            author_name: form.author_name,
            description: form.description,
            genre: categoriesArray,
            thumbnail: form.thumbnail,
            images: form.images,
            price: parseFloat(form.price),
            tags: form.tags,
        }),
    });

    const data = await response.json();

    if (data.id) {
        navigateTo(`/dashboard/books`);
    }
};

// image upload

</script>
