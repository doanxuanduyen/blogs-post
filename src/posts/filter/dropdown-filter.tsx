import type { BaseOption } from "../shared/data/dropdownOptions.data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DropdownProps {
  value: string;
  options: BaseOption[];
  onSelectOption: (val: string) => void;
  placeholder?: string;
}

const Dropdown = (props: DropdownProps) => {
  return (
    <Select
      value={props.placeholder ? undefined : props.value}
      onValueChange={(val) => props.onSelectOption(val)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {props.options.map((item: any) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
