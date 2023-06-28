<template>
  <SlideOver
    :is-open="isOpenSlideOver"
    :title="companyTitle"
    @close="onClose"
  >
    <div v-if="company">
      <div v-if="isLoaded">
        <ul
          role="list"
          class="divide-y divide-gray-100"
        >
          <li
            v-for="note in companyNotes"
            :key="note.id"
            class="flex items-center justify-between gap-x-3 py-5"
          >
            <div class="min-w-0">
              <div class="flex items-start gap-1 flex-col">
                <p class="text-sm font-semibold leading-6 text-gray-900">
                  <a
                    href="javascript:void(0)"
                    @click="
                      $router.push({
                        name: 'interview-journey-view',
                        params: {
                          id: pickThingId(note.journeyItem?.journeyId),
                        },
                      })
                    "
                  >
                    {{ note.journeyItem?.journey?.name }}
                  </a>
                </p>
                <p
                  :class="[
                    'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                  ]"
                >
                  {{ note.stage?.name }}
                </p>
              </div>
              <div
                class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500"
              >
                <p class="whitespace-nowrap">
                  Created: {{ getDisplayDateTime(note.createdAt) }}
                </p>
              </div>
            </div>
            <div class="flex flex-none items-center gap-x-4">
              <Button @click="onClickViewFinalNote(note)">View Note</Button>
            </div>
          </li>
        </ul>
      </div>
      <div
        v-else
        class="text-sm"
      >
        No notes or there might be an error while getting result. Please try
        again.
      </div>
      <ViewFinalNoteModal
        v-if="viewingNote?.journeyItem"
        :is-open="isOpenModal"
        :company-note="viewingNote"
        :journey-item="viewingNote.journeyItem"
        @close="isOpenModal = false"
      />
    </div>
    <template #bottom-buttons>
      <Button
        type="secondary"
        @click="onClose"
      >
        Close
      </Button>
    </template>
  </SlideOver>
</template>

<script setup lang="ts">
import { Company, CompanyNote } from 'shared';
import SlideOver from '@/components/SlideOver/SlideOver.vue';
import { computed, ref, watch } from 'vue';
import Button from '@/components/Button/Button.vue';
import { companyNoteRepo } from '@/repositories/companyNote.repo';
import ViewFinalNoteModal from '@/screens/InterviewJourneyView/components/ViewJourneyItemModal/Utils/ViewFinalNoteModal.vue';
import { getDisplayDateTime } from '@/utils/date';
import { pickThingId } from '@/utils/surrealThing';

type ViewCompanyFinalNotesSlideOverProps = {
  company: Company | null;
};

type ViewCompanyFinalNotesSlideOverEmits = {
  (e: 'close'): void;
};

const props = defineProps<ViewCompanyFinalNotesSlideOverProps>();
const emits = defineEmits<ViewCompanyFinalNotesSlideOverEmits>();

const isOpenSlideOver = ref(false);
const isLoaded = ref(false);
const isOpenModal = ref(false);

const companyNotes = ref<CompanyNote[]>([]);
const viewingNote = ref<CompanyNote>();

const companyTitle = computed(
  () => `Viewing my final notes of ${props.company?.name || ''}`
);

watch(
  () => props.company,
  async (company) => {
    isOpenSlideOver.value = !!company;

    const ids = company?.companyNotes?.map((note) => note.id) ?? [];
    if (!ids.length) {
      isLoaded.value = false;
      return;
    }

    companyNotes.value = await companyNoteRepo.getByIds(ids);

    isLoaded.value = true;
  },
  {
    immediate: true,
  }
);

const onClose = () => {
  isOpenSlideOver.value = false;
  emits('close');
};

const onClickViewFinalNote = (note: CompanyNote) => {
  viewingNote.value = note;
  isOpenModal.value = true;
};
</script>
