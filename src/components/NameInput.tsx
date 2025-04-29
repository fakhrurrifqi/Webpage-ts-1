import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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
      <Label htmlFor={id} className="text-md text-card-foreground mb-1 block">
        {label}
      </Label>
      <Input
        id="name"
        type="text"
        {...register(name)}
        value={value}
        onChange={onChange}
        className="border-input placeholder:text-muted-foreground text-foreground focus-visible:ring-ring w-full rounded-md border text-base shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default NameInput;
