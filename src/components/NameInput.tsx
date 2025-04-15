import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type NameInputProps<T extends FieldValues> = {
  id: string;
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  error?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const NameInput = <T extends FieldValues>({
  id,
  label,
  register,
  name,
  value,
  error,
  onChange,
}: NameInputProps<T>) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-md mb-1 block text-gray-600 dark:text-gray-300"
      >
        {label}
      </label>
      <input
        id="name"
        type="text"
        {...register(name)}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-300 p-3 focus:outline-2 focus:outline-indigo-400 dark:border-slate-400 dark:text-white"
      />
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default NameInput;
