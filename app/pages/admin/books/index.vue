
<template>
  <div v-if="loading"
    class="absolute inset-0 bg-black/20 dark:bg-white/10 flex items-center justify-center z-50 rounded-xl">
    <Loader style="width:50px;height:50px" />
  </div>
  <MyBreadcrumb :breadcrumbs="[
    { name: 'Dashboard', to: '', icon: 'pi pi-home' },
    { name: 'Books', to: '#' }
  ]" :actions="[
      { name: 'Add Book', type: 'link', to: `/${user.role}/books/create`, icon: 'pi pi-plus' },
    ]" @action="handleAction" />

  <section
    class="p-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 relative">

    <!-- ✅ Loading Overlay -->


    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold mb-6 flex items-center gap-2">
        Books Dashboard
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <HomeBookCard v-for="book in books" :key="book.id" :book="book"
        class="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition relative"
        @delete="(event) => showTemplate(event, book.id)" :edit="true" />

    </div>
  </section>

  <!-- confirm popup -->
  <Toast />
  <ConfirmPopup group="templating">
    <template #message="slotProps">
      <div
        class="flex flex-col items-center w-full gap-4 border-b border-surface-200 dark:border-surface-700 p-4 mb-4 pb-0">
        <i :class="slotProps.message.icon" class="!text-6xl text-primary-500"></i>
        <p>{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmPopup>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSupabaseClient } from "#imports";
import HomeBookCard from '~/components/home/HomeBookCard.vue'
import MyBreadcrumb from '~/components/common/MyBreadcrumb.vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import Loader from '~/components/Loader.vue';
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";

const client = useSupabaseClient();
const books = ref([]);
const loading = ref(false);       // ✅ loading for fetching books
const deletingId = ref(null);     // ✅ track book being deleted

async function fetchBooks() {
  loading.value = true;
  const { data, error } = await client.from("books").select("*");
  books.value = data || [];
  loading.value = false;
}

onMounted(() => {
  fetchBooks();
});

const handleAction = (action) => {
  if (action.name === "Add Book") {
    alert("Add Book clicked");
  } else if (action.name === "Export CSV") {
    alert("Export CSV clicked");
  } else if (action.name === "CSV") {
    alert("CSV clicked");
  }
};

const confirm = useConfirm();
const toast = useToast();

const showTemplate = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    group: "templating",
    message: "Please confirm to delete this book.",
    icon: "pi pi-exclamation-circle",
    rejectProps: {
      icon: "pi pi-times",
      label: "Cancel",
      outlined: true,
    },
    acceptProps: {
      icon: "pi pi-check",
      label: "Confirm",
      severity: "danger",
      outlined: true,
     
    },
    accept: async () => {
      deletingId.value = id;   // ✅ show loader for this book
      await deleteBook(id);
      deletingId.value = null;
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};

const deleteBook = async (id) => {
  const { error } = await client.from("books").delete().eq("id", id);
  if (error) {
    console.error("Error deleting book:", error);
  } else {
    toast.add({
      severity: "warn",
      summary: "Deleted",
      detail: "Book deleted successfully",
      life: 3000,
    });
    fetchBooks();
  }
};
</script>
