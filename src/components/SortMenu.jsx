import PropTypes from "prop-types";
import { Select } from "semantic-ui-react";

const sortingOptions = [
  { key: "date", value: "release_date", text: "Sorted by release date" },
  { key: "episodeId", value: "episode_id", text: "Sorted by episode" },
  { key: "title", value: "title", text: "Sorted by title" },
  { key: "rating", value: "averageRating", text: "Sorted by rating" },
];

const SortMenu = ({ sortKey = "release_date", onSortChange = () => {} }) => {
  return (
    <Select
      placeholder="Select sort option"
      options={sortingOptions}
      onChange={onSortChange}
      value={sortKey}
      className="sort-dropdown"
    />
  );
};

SortMenu.propTypes = {
  sortKey: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default SortMenu;
