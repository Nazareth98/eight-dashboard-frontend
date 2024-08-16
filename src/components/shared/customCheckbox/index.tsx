const CustomCheckbox = ({
  label,
  checked,
  setChecked = null,
  onChange = null,
}) => {
  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex gap-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange ? onChange : handleCheckboxChange}
      />
      <label
        className="text-gray-500 text-sm font-heading"
        style={{ marginRight: "8px" }}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
