<template>
    <div class="max-w-sm mx-auto p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <i class="pi pi-book text-blue-500"></i> Add Book
        </h2>

        <!-- Title Field -->
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-tag text-gray-500"></i>
            </InputGroupAddon>
            <InputText v-model="form.title" placeholder="Enter book title" class="w-full" />
        </InputGroup>
        <small class="text-rose-500" v-if="errors.title">{{ errors.title }}</small>

        <!-- Author Field -->
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user text-gray-500"></i>
            </InputGroupAddon>
            <InputText v-model="form.author_name" placeholder="Enter author name" class="w-full" />
        </InputGroup>
        <small class="text-rose-500" v-if="errors.author_name">{{ errors.author_name }}</small>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-3">
            <Button label="Cancel" severity="secondary" outlined class="p-button-sm dark:text-gray-100" @click="$router.back()" />
            <Button label="Save" icon="pi pi-check" class="p-button-sm" @click="submitForm" />
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const route = useRoute()
const form = reactive({
    title: "",
    author_name: "",
    id: route.params.id,
});

const response = await fetch(`/api/books?id=${route.params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        
    });

    const data = await response.json()


if (data){
    form.title = data.title
    form.author_name = data.author_name
}

const errors = reactive({
    title: "",
    author_name: "",
});
const submitForm = async () => {
    console.log("Form submitted:", form);
  
    // Submit form data to API
    const response = await fetch("/api/books", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: form.title,
            author_name: form.author_name,
            id: form.id
        }),
    });
    const data = await response.json();

    // Redirect to book details page
    if (data.id) {
        navigateTo(`/dashboard/books/${data.id}`);
    }
};

</script>