<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div
      class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg transform transition-all hover:scale-105">
      <!-- Header -->
      <h2 class="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
        <i class="pi pi-sign-in mr-2 text-blue-500"></i> Sign Up
      </h2>
      <p class="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
        Create an account to access your dashboard
      </p>

      <form class="space-y-4" @submit.prevent="onSubmit">

        <div class="grid grid-cols-2 gap-4">
          <div>
            <InputText v-model="first_name" type="text" placeholder="First Name" class="w-full text-xs" />
            <p v-if="errors.first_name" class="text-red-500 text-sm mt-1">{{ errors.first_name }}</p>
          </div>
          <div>
            <InputText v-model="middle_name" type="text" placeholder="Middle Name" class="w-full text-xs" />
            <p v-if="errors.middle_name" class="text-red-500 text-sm mt-1">{{ errors.middle_name }}</p>
          </div>
          <div>
            <InputText v-model="last_name" type="text" placeholder="Last Name" class="w-full text-xs"  />
            <p v-if="errors.last_name" class="text-red-500 text-sm mt-1">{{ errors.last_name }}</p>
          </div>
             <div>
          <InputText v-model="email" type="email" placeholder="Email" class="w-full text-xs" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <InputText v-model="phone_number" type="tel" placeholder="Phone Number" class="w-full text-xs" />
          <p v-if="errors.phone_number" class="text-red-500 text-sm mt-1">{{ errors.phone_number }}</p>
        </div>

        <div>
          <InputText v-model="password" type="password" placeholder="Password" class="w-full text-xs" />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>
        </div>

     

        <Button type="submit" label="Register" icon="pi pi-user-plus" :loading="isSubmitting" class="w-full" />
      </form>


      <p class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?
        <NuxtLink to="/auth/login" class="text-blue-600">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>
<script setup>
import { useSupabaseClient } from "#imports"
import { useRouter } from "vue-router"
import { useForm, useField } from "vee-validate"
import * as yup from "yup"
import InputText from 'primevue/inputtext';

definePageMeta({
  layout: "guest",
})

const client = useSupabaseClient()
const router = useRouter()

// ✅ Validation schema
const schema = yup.object({
  first_name: yup.string().required("First name is required"),
  middle_name: yup.string(), // optional
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

// ✅ useForm with schema
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
})

// ✅ fields
const { value: first_name } = useField("first_name")
const { value: middle_name } = useField("middle_name")
const { value: last_name } = useField("last_name")
const { value: email } = useField("email")
const { value: phone_number } = useField("phone_number")
const { value: password } = useField("password")

// ✅ Submit
const onSubmit = handleSubmit(async (values) => {
  try {
    const { data, error } = await client.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.first_name,
          middle_name: values.middle_name,
          last_name: values.last_name,
          phone_number: values.phone_number,
          role: "user",
          avatar_url: null,
        },
      },
    })

    if (error) {
      alert(error.message)
      return
    }

    alert("Registration successful! Please check your email for verification.")
    router.push("/auth/login")
  } catch (err) {
    console.error("Unexpected error:", err)
    alert("Something went wrong, please try again.")
  }
})
</script>
