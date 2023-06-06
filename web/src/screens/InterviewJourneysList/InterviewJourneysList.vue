<template>
  <AppPage
    header-title="Interview Journeys"
    description="All of your Interview Journeys are here"
  >
    <table class="w-full text-left">
      <thead class="bg-white">
        <tr>
          <th
            scope="col"
            class="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
          >
            Name
            <div
              class="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200"
            />
            <div
              class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200"
            />
          </th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Title
          </th>
          <th
            scope="col"
            class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
          >
            Email
          </th>
          <th
            scope="col"
            class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Role
          </th>
          <th scope="col" class="relative py-3.5 pl-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in people" :key="person.email">
          <td class="relative py-4 pr-3 text-sm font-medium text-gray-900">
            {{ person.name }}
            <div
              class="absolute bottom-0 right-full h-px w-screen bg-gray-100"
            />
            <div class="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
          </td>
          <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
            {{ person.title }}
          </td>
          <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
            {{ person.email }}
          </td>
          <td class="px-3 py-4 text-sm text-gray-500">{{ person.role }}</td>
          <td class="relative py-4 pl-3 text-right text-sm font-medium">
            <a href="#" class="text-indigo-600 hover:text-indigo-900"
              >Edit<span class="sr-only">, {{ person.name }}</span></a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </AppPage>
</template>

<script setup>
import AppPage from '@/components/AppPage/AppPage.vue';

const people = [
  {
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member',
  },
  // More people...
];
</script>
