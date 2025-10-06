<template>
  <div class="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
    <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-6">
      <i class="pi pi-book text-blue-500"></i> Add Book
    </h2>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left side: Form fields -->
      <div class="space-y-4">
        <!-- Title -->
        <InputText v-model="form.title" placeholder="Enter book title" class="w-full" />
        <small class="text-rose-500" v-if="errors.title">{{ errors.title }}</small>

        <!-- Author -->
        <InputText v-model="form.author_name" placeholder="Enter author name" class="w-full" />
        <small class="text-rose-500" v-if="errors.author_name">{{ errors.author_name }}</small>

        <!-- Description -->
        <Textarea v-model="form.description" rows="3" placeholder="Enter book description" class="w-full" />
        <small class="text-rose-500" v-if="errors.description">{{ errors.description }}</small>


        <!-- Genre -->
        <MultiSelect v-model="form.genre" showClear :options="booksCategories" optionLabel="name" filter
          placeholder="Select Tags" :maxSelectedLabels="3" class="w-full" />



        <!-- Tags -->
        <InputText v-model="form.tags" placeholder="Enter tags, comma separated" class="w-full" />
        <small class="text-rose-500" v-if="errors.tags">{{ errors.tags }}</small>


        <!-- Published Date -->
        <DatePicker v-model="form.published_date" class="w-full" placeholder="Select date" />
        <small class="text-rose-500" v-if="errors.published_date">{{ errors.published_date }}</small>

        <!-- Price -->
        <InputNumber v-model="form.price" mode="decimal" :minFractionDigits="0" :maxFractionDigits="2"
          placeholder="Enter price" class="w-full" />
      </div>

      <!-- Right side: Uploaders -->
      <div class="space-y-4">
        <!-- Thumbnail URL -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Thumbnail</h3>
          <MyUploader v-model="form.thumbnail" :deleteApi="null" uploadUrl="/api/fileupload" :multiple="false"
            accept="image/*" />
        </div>

        <!-- Images (comma-separated) -->
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Images</h3>
          <MyUploader v-model="form.images" :deleteApi="null" uploadUrl="/api/fileupload" :multiple="true"
            accept="image/*" />
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3 mt-6">
      <Button label="Cancel" severity="secondary" outlined class="p-button-sm" @click="$router.back()" />
      <Button label="Save" icon="pi pi-check" :loading="isSubmitting" class="p-button-sm" @click="submitForm" />
    </div>
  </div>
  
</template>

<script setup>
import { reactive, ref, watch, onMounted } from "vue";
import MultiSelect from "primevue/multiselect";
import MyUploader from "~/components/MyUploader.vue";
import Textarea from "primevue/textarea";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { useToast } from "primevue/usetoast";


const toast = useToast();


const client = useSupabaseClient();

const booksCategories = ref([]);

const getBooksCategories = async () => {
  const { data, error } = await client.from("books_categories").select();
  if (error) {
    console.log(error);
  } else {
    booksCategories.value = data;
  }
};

onMounted(() => {
  getBooksCategories();
});

const form = reactive({
  title: "",
  author_name: "",
  description: "",
  genre: [],
  thumbnail: "",
  images: "",
  price: 0,
  tags: "",
  published_date: "",
});

const errors = reactive({
  title: "",
  author_name: "",
});

// ✅ Validation function
const validateForm = () => {
  errors.title = form.title ? "" : "Title is required";
  errors.author_name = form.author_name ? "" : "Author is required";
  errors.description = form.description ? "" : "Description is required";
  errors.thumbnail = form.thumbnail ? "" : "Thumbnail is required";
  errors.price = form.price ? "" : "Price is required";
  errors.tags = form.tags ? "" : "Tags are required";
  errors.published_date = form.published_date ? "" : "Published Date is required";

};

// ✅ Watch form changes (onchange validation)
watch(
  () => ({ ...form }),
  () => validateForm(),
  { deep: true }
);

// ✅ Button loading state
const isSubmitting = ref(false);

const submitForm = async () => {
  validateForm();

  if (errors.title || errors.author_name) {
    return; // stop submit if errors exist
  }

  isSubmitting.value = true;

  try {
    const categoriesArray = form.genre
      ? form.genre.map((tag) => tag.code)
      : null;

    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        author_name: form.author_name,
        description: form.description,
        genre: categoriesArray,
        thumbnail: form.thumbnail || null,
        images: form.images || null,
        price: parseFloat(form.price),
        tags: form.tags,
        published_date: form.published_date,
      }),
    });

    const data = await response.json();

    // console.log("Saved:", data);
    // toast
    if (data.id) {
      toast.add({ severity: 'success', summary: 'Success Message', detail: 'Book saved successfully', life: 3000 });
      navigateTo(`/admin/books`);
    }
  } catch (error) {
    console.error("Error saving:", error);
  } finally {
    isSubmitting.value = false;
  }
};

</script>
