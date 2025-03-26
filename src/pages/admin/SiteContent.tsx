
// This fixes the specific type error in SiteContent.tsx where a textarea change handler
// was being assigned to a function that expected an input change handler
// We're updating only the specific function with the issue

// Find the textarea with the onChange handler and fix its type
const handleMetaDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setCurrentPage({
    ...currentPage,
    meta: {
      ...currentPage.meta,
      description: e.target.value
    }
  });
};

// Use this function for the textarea instead of the one for inputs
