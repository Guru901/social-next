const PostItems = [
  {
    lable: "Gloabal",
    selectedOption: "global",
  },
  {
    lable: "Friends",
    selectedOption: "friends",
  },
];

export const FetchOptions = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="join w-[10rem]">
      {PostItems.map((postItem) => (
        <input
          key={postItem.lable}
          className="join-item btn w-[50%] p-1 h-min"
          name="options"
          type="radio"
          aria-label={postItem.lable}
          checked={selectedOption === postItem.selectedOption}
          onChange={() => setSelectedOption(postItem.selectedOption)}
        />
      ))}
    </div>
  );
};
