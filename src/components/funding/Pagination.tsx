const itemsPerPage = 6;

const start =
  (currentPage - 1) * itemsPerPage;

const paginatedGrants =
  filteredGrants.slice(
    start,
    start + itemsPerPage
  );