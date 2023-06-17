import { z, ZodError, ZodSchema } from 'zod';
import { Ref, ref } from 'vue';
import { UnknownRecord } from '@/types';

type ValidateOkResult<T> = {
  success: true;
  parsedObject: T;
};

type ValidateErrResult<T> = {
  success: false;
};

type ValidateResult<T> = ValidateOkResult<T> | ValidateErrResult<T>;

type UseValidationReturn<T> = {
  errorsBag: Ref<Map<keyof T, string | undefined>>;
  validate: (inputs: UnknownRecord) => ValidateResult<T>;
  reset: () => void;
};

/**
 * Quickly validate the data and get the error messages
 *
 * @note only support 1-level schema & error message at the moment
 *
 * T: the parsed entity/object after validating
 */
export default function useValidation<T>(
  schema: ZodSchema
): UseValidationReturn<T> {
  const errorsBag = ref<Map<keyof T, string | undefined>>(new Map());

  const setErrorBags = (errors: ZodError) => {
    errorsBag.value = new Map();

    errors.issues.forEach((issue) => {
      const field = issue.path[0] as keyof T;
      if (errorsBag.value.has(field)) {
        return;
      }

      errorsBag.value.set(field, issue.message);
    });
  };

  const validate = (inputs: UnknownRecord): ValidateResult<T> => {
    const object = schema.safeParse(inputs);

    if (!object.success) {
      setErrorBags(object.error);
    }

    return {
      success: object.success,
      parsedObject: object.success ? object.data : undefined,
    };
  };

  const reset = () => (errorsBag.value = new Map());

  return {
    errorsBag,
    validate,
    reset,
  };
}
