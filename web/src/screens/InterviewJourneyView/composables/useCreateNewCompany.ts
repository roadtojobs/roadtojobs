import { ref } from 'vue';
import { useLoading } from '@/composable/useLoading';
import useValidation from '@/composable/useValidation';
import { z } from 'zod';
import { notify } from '@kyvg/vue3-notification';
import { useCurrentUser } from '@/stores/useCurrentUser';
import { companyRepo } from '@/repositories/company.repo';
import { Company } from 'shared/entities/company.entity';

const createCompany = z.object({
  name: z.string().min(1, 'Company name is required'),
  description: z.string().default(''),
  homepage: z.string().default(''),
  countryCode: z.string().default(''),
  userId: z.string().min(1),
});

type CreateCompany = z.infer<typeof createCompany>;

export const useCreateNewCompany = (onAdded: (company: Company) => void) => {
  const isOpenAddCompany = ref(false);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { userId } = useCurrentUser();

  const { errorsBag, validate, reset } =
    useValidation<CreateCompany>(createCompany);

  const addCompanyForm = ref<CreateCompany>({
    name: '',
    description: '',
    homepage: '',
    countryCode: '',
    userId,
  });

  const onClickOpenAddCompany = (query: string) => {
    isOpenAddCompany.value = true;
    addCompanyForm.value.name = query;
  };

  const onCloseAddCompany = () => (isOpenAddCompany.value = false);

  const onSubmitAddCompany = async () => {
    reset();

    const validateResult = validate({ ...addCompanyForm.value });
    if (!validateResult.success) {
      return notify({
        type: 'error',
        title: 'Validation Error',
        text: 'Please check the error(s), fix and try again.',
      });
    }

    startLoading();
    const creationResult = await companyRepo.create(
      validateResult.parsedObject
    );
    stopLoading();

    if (!creationResult) {
      return notify({
        type: 'error',
        title: 'Creation Error',
        text: 'There was an error while handling the creation. Please try again.',
      });
    }

    notify({
      type: 'success',
      title: 'Created',
      text: `New company created, let's continue with the Add Journey Item`,
    });

    onAdded(creationResult);
    onCloseAddCompany();
  };

  return {
    isOpenAddCompany,
    onClickOpenAddCompany,
    onCloseAddCompany,
    isLoadingAddCompany: isLoading,
    addCompanyForm,
    onSubmitAddCompany,
    addCompanyErrors: errorsBag,
  };
};
