<template>
  <Modal
    title="Final Stage Information"
    width-size="xl"
    :is-open="true"
    :wants-close-on-click-outside="false"
    hide-top-close-button
    @close="true"
  >
    <div class="my-4 flex flex-col gap-3">
      <div class="text-sm prose text-black">
        <p v-if="stage.isGoodStage">
          Congrats to moving forward to the
          <strong>{{ stage.name }}</strong> stage 🥳! You rock!
        </p>
        <p v-else-if="stage.isBadStage">
          It is too bad that you arrived to the
          <strong>{{ stage.name }}</strong> stage 😥!
        </p>
        <p>Let's add some information for your future references ✌️</p>
      </div>
      <div class="mt-2">
        <InlineRadio
          v-model="form.feeling"
          label="Your feeling"
          sub-label="Your truly feeling after reached this stage"
          name="feeling"
          :items="feelingItems"
        />
      </div>
      <div class="mt-2">
        <Textarea
          v-model="form.feelingNote"
          label="Feeling Note (Optional)"
          placeholder="Always a good idea to note down everything in your road. Markdown supported!"
          rows="4"
        />
      </div>
      <div
        v-if="stage.isBadStage"
        class="mt-2"
      >
        <InlineRadio
          v-model="form.opinion"
          label="Your opinion"
          sub-label="Your opinion on this company when reached this stage"
          name="opinion"
          :items="badOpinionItems"
        />
      </div>
      <div
        v-if="stage.isBadStage"
        class="mt-2"
      >
        <Textarea
          v-model="form.opinionNote"
          label="Opinion Note (Optional)"
          placeholder="Always a good idea to note down everything in your road. Markdown supported!"
          rows="4"
        />
      </div>
      <div class="mt-2">
        <Textarea
          v-model="form.note"
          label="Other Notes (if any, optional)"
          placeholder="Always a good idea to note down everything in your road. Markdown supported!"
          rows="4"
        />
      </div>
    </div>
    <template #bottom-buttons>
      <Button
        @click="onClickAddNote"
        :isLoading="isLoading"
      >
        Note
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/components/Modal/Modal.vue';
import { Stage, JourneyItem, CompanyNote } from 'shared';
import InlineRadio from '@/components/RadioGroup/InlineRadio.vue';
import {
  addFinalStageNote,
  AddFinalStageNote,
  getBadOpinionRadioItems,
  getFeelingRadioItems,
} from '@/screens/InterviewJourneyView/components/ActionModals/AddNoteFinalStageModal.methods';
import Textarea from '@/components/Textarea/Textarea.vue';
import Button from '@/components/Button/Button.vue';
import { useLoading } from '@/composable/useLoading';
import { ref } from 'vue';
import useValidation from '@/composable/useValidation';
import { notify } from '@kyvg/vue3-notification';
import { companyNoteRepo } from '@/repositories/companyNote.repo';

type AddNoteFinalStageModalProps = {
  isOpen: boolean;
  journeyItem: JourneyItem;
  stage: Stage;
};

type AddNoteFinalStageModalEmits = {
  (e: 'added-note', companyNote: CompanyNote): void;
};

const props = defineProps<AddNoteFinalStageModalProps>();
const emits = defineEmits<AddNoteFinalStageModalEmits>();

const feelingItems = getFeelingRadioItems();
const badOpinionItems = getBadOpinionRadioItems();

const { validate, errorsBag, reset } =
  useValidation<AddFinalStageNote>(addFinalStageNote);
const { isLoading } = useLoading();

const form = ref<AddFinalStageNote>({
  companyId: props.journeyItem.companyId,
  stageId: props.stage.id,
  userId: props.journeyItem.userId,
  journeyItemId: props.journeyItem.id,
  feeling: 'good',
  feelingNote: '',
  opinion: '',
  opinionNote: '',
  note: '',
});

const onClickAddNote = async () => {
  reset();

  const validateResult = validate({ ...form.value });

  if (props.stage.isBadStage && !form.value.opinion) {
    errorsBag.value.set('opinion', 'Opinion is required');
  }

  if (!validateResult.success) {
    return notify({
      type: 'error',
      title: 'Validation Error',
      text: 'Please check the error(s), fix and try again.',
    });
  }

  const parsed = validateResult.parsedObject;
  const addNoteResult = await companyNoteRepo.upsert(parsed);
  if (!addNoteResult) {
    return notify({
      type: 'error',
      title: 'Add Note Error',
      text: 'There was an error while adding your note. Please try again.',
    });
  }

  emits('added-note', addNoteResult);

  return notify({
    type: 'success',
    title: 'Added Note',
    text: 'Added the note for your journey item.',
  });
};
</script>
