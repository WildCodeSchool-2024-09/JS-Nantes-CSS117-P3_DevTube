interface CategoryCreationProps {
  isCategoryCreationSectionOpen: boolean;
  setIsCategoryCreationSectionOpen: (value: boolean) => void;
}

export default function CategoryCreation({
  isCategoryCreationSectionOpen,
  setIsCategoryCreationSectionOpen,
}: CategoryCreationProps) {
  return (
    <>
      {!isCategoryCreationSectionOpen && (
        <button
          type="button"
          className="admin-link"
          onClick={() =>
            setIsCategoryCreationSectionOpen(!isCategoryCreationSectionOpen)
          }
        >
          Create a video
        </button>
      )}
    </>
  );
}
