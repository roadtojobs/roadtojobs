<template>
  <div
    v-if="company.mode === 'green'"
    class="text-sm"
  >
    <span class="text-green-600">
      Cool, you haven't interviewed with this company before, let's get started!
    </span>
  </div>
  <div
    v-else
    class="text-sm"
  >
    <span
      v-if="company.mode === 'yellow'"
      class="text-yellow-600"
    >
      You have interviewed with this company before.
      <span v-if="isLoaded"> Check out your previous final stage notes: </span>
    </span>
    <span
      v-else
      class="text-red-600"
    >
      Uh oh, this company is in your <strong>Avoid-list ❌</strong>.
      <span v-if="isLoaded"> Check out your previous final stage notes: </span>
    </span>
    <div
      v-if="isLoaded"
      class="prose-sm prose-ul:list-disc my-2"
    >
      <ul class="prose-sm prose-ul:list-disc">
        <li
          v-for="note in companyNotes"
          :key="note.id"
        >
          <a
            href="#"
            class="text-sky-500 hover:text-rose-600 font-semibold"
            @click="true"
          >
            [View]
          </a>
          From <strong>{{ note.journeyItem.journey.name }}</strong> - Stage:
          {{ note.stage.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CompanyComboboxItem } from '@/screens/InterviewJourneyView/components/ActionModals/AddJourneyItemModal.methods';
import { onMounted, ref, watch } from 'vue';
import { CompanyNote } from 'shared/entities';
import { companyNoteRepo } from '@/repositories/companyNote.repo';

type CompanyNoteInformationProps = {
  company: CompanyComboboxItem;
};

const props = defineProps<CompanyNoteInformationProps>();

const isLoaded = ref(false);

const companyNotes = ref<CompanyNote[]>([]);

watch(
  () => props.company,
  async (company) => {
    const ids = company.companyNotes.map((note) => note.id);
    if (!ids.length) {
      isLoaded.value = false;
      return;
    }

    companyNotes.value = await companyNoteRepo.getByIds(ids);

    isLoaded.value = !!companyNotes.value.length;
  },
  {
    immediate: true,
  }
);
</script>
