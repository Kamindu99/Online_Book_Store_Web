// material-ui
import { Autocomplete, Box, FormControl, InputAdornment, TextField } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import navigation from 'menu-items';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

// Menu item type definition
interface MenuItem {
  id: string;
  title: string;
  url: string;
}

// Utility to flatten menu structure
const FlattenMenu = (menu: any, parentPath: string = ""): MenuItem[] => {

  const intl = useIntl();

  let flatList: MenuItem[] = [];
  menu.forEach((item: any) => {

    const fullPath = parentPath + (item.url || ""); // Ensure paths are concatenated correctly

    if (item.type === "item") {
      flatList.push({ id: item.id, title: intl.formatMessage({ id: item.title.props.id }), url: fullPath });
    }
    if (item.children) {
      flatList = flatList.concat(FlattenMenu(item.children, fullPath));
    }
  });
  return flatList;
};

const Search = () => {
  const navigate = useNavigate();

  const allMenuItems = navigation() ? FlattenMenu(navigation().items) : [];

  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<MenuItem[]>([]);

  // Handle input change to filter options
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setFilteredOptions(
        allMenuItems.filter((option) =>
          option.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
    else {
      setFilteredOptions([]);
    }
  };

  // Handle option selection
  const handleOptionSelect = (_: any, value: MenuItem | null) => {
    if (value?.url) {
      navigate(value.url)
      setInputValue('');
      setFilteredOptions([]);
    }
  };

  useEffect(() => {
    setInputValue('');
  }, [window.location.pathname]);

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: "100%", md: 224 } }}>
        <Autocomplete
          freeSolo
          options={filteredOptions}
          //@ts-ignore
          getOptionLabel={(option) => option.title || ''}
          inputValue={inputValue}
          onInputChange={(_, value) => setInputValue(value)}
          //@ts-ignore
          onChange={handleOptionSelect}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder="Search..."
              onChange={handleInputChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

export default Search;
