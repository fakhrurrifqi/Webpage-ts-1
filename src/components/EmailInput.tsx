import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type EmailInputProps<T extends FieldValues> = {
  id: string;
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
};

const EmailInput = <T extends FieldValues>({
  id,
  label,
  register,
  name,
  error,
}: EmailInputProps<T>) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-md text-gray-600 dark:text-gray-300 mb-1"
      >
        {label}
      </label>
      <input
        id="email"
        type="email"
        {...register(name)}
        className="w-full rounded-md border border-gray-300 dark:border-slate-400 dark:text-white p-3 focus:outline-2 focus:outline-indigo-400"
      />
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default EmailInput;
