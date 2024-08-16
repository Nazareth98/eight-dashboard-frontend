import { Search, Users } from "lucide-react";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import { chatbotContext } from "../../contexts/chatbotContext";
import GroupType from "../../types/groupType";
import CustomCheckbox from "../shared/customCheckbox";
import CustomInput from "../shared/customInput";
import IconSearch from "../../assets/svg/iconSearch";

interface SelectGroupsProps {
  selectGroups: GroupType[];
  setSelectGroups: Dispatch<React.SetStateAction<GroupType[]>>;
}

const SelectGroups = ({ selectGroups, setSelectGroups }: SelectGroupsProps) => {
  const { groups } = useContext(chatbotContext);

  const [groupOptions, setGroupOptions] = useState<GroupType[]>();

  const [isLoading, setIsLoading] = useState(true);
  const [allGroupsChecked, setAllGroupsChecked] = useState(false);

  const [inputGroup, setInputGroup] = useState("");

  useEffect(() => {
    if (groups) {
      const updatedGroups = groups.map((group) => {
        group.isSelected = false;
        return group;
      });
      setGroupOptions(updatedGroups);

      setTimeout(() => setIsLoading(false), 300);
    }
  }, [groups]);

  function handleSelectGroup({ currentTarget }) {
    const id = Number(currentTarget.id);
    const updatedGroup = groupOptions?.map((group) => {
      if (group.id === id) {
        group.isSelected = !group.isSelected;

        if (group.isSelected) {
          const updateSelectGroups = [...selectGroups, group];
          setSelectGroups(updateSelectGroups);
        } else {
          const updateSelectGroups = selectGroups.filter(
            (group) => group.id !== id
          );
          setSelectGroups(updateSelectGroups);
        }
      }
      return group;
    });
    setGroupOptions(updatedGroup);
  }

  function handleCheckAllGroups() {
    setAllGroupsChecked(!allGroupsChecked);

    const updatedGroups = groupOptions.map((group) => {
      group.isSelected = !allGroupsChecked;
      return group;
    });
    setGroupOptions(updatedGroups);

    if (!allGroupsChecked) {
      setSelectGroups(updatedGroups);
    } else {
      setSelectGroups([]);
    }
  }

  function handleSearchGroup({ target }) {
    const inputText = target.value;
    setInputGroup(inputText);

    const filteredGroups = groups?.filter((group) =>
      group.name.toLowerCase().includes(inputText.toLowerCase())
    );

    setGroupOptions(filteredGroups);
  }

  return (
    <>
      <div className="flex flex-col items-start gap-2">
        <CustomCheckbox
          label="Selecionar todos"
          checked={allGroupsChecked}
          onChange={handleCheckAllGroups}
        />
        <CustomInput
          inputValue={inputGroup}
          icon={<Search className="size-5 text-gray-700" />}
          placeholder="Pesquise por um Grupo"
          onChange={handleSearchGroup}
        />
      </div>

      <div className="h-full flex flex-col gap-2 overflow-y-auto">
        {groupOptions?.map((group: GroupType) => {
          return (
            <div
              id={group.id.toString()}
              onClick={handleSelectGroup}
              key={group.chatId}
              className={`flex items-center gap-2 border-l-4 border-2 border-gray-900  rounded p-2 cursor-pointer transition-all hover:bg-gray-900 active:bg-gray-950 fade-left ${
                group.isSelected ? "border-l-primary-400" : "border-l-gray-600"
              }`}
            >
              <div>
                <Users
                  className={
                    group.isSelected
                      ? "size-4 text-primary-400"
                      : "size-4 text-gray-600"
                  }
                />
              </div>
              <p className="text-gray-100 text-sm font-heading">{group.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SelectGroups;
