import { Button, ButtonProps, Box } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { MenuOptions } from "../../types";
import theme from "../../theme/theme";

const SelectButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: grey["A700"],
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: theme.palette.neutral,
  },
  border: "1px solid" + theme.palette.neutral,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
}));

interface Props {
  onSelectCallback: (name: string, value: string) => void;
  options: MenuOptions[];
  name: string;
  selectedItem: string;
}

function FilterMenu({ onSelectCallback, options, name, selectedItem }: Props) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedItem);

  const handleClick = () => setMenuOpen(!menuOpen);
  const handleClose = () => setMenuOpen(false);

  const handleSelect = (option: MenuOptions) => {
    setSelectedOption(option.value);
    onSelectCallback(name, option.value);
    handleClose();
  };

  return (
    <>
      <SelectButton
        fullWidth
        sx={{ marginTop: theme.spacing(0.5) }}
        variant="contained"
        data-testid={"menu-button"}
        disableElevation
        onClick={handleClick}
        endIcon={
          menuOpen ? (
            <ArrowDropUp sx={{ color: grey[400] }} />
          ) : (
            <ArrowDropDown style={{ color: grey[400] }} />
          )
        }
      >
        {selectedOption}
      </SelectButton>
      {menuOpen && (
        <Box
          sx={{
            width: "100%",
            border: "1px solid " + theme.palette.neutral,
            borderRadius: "3px",
            marginTop: theme.spacing(0.5),
            cursor: "pointer",
          }}
          data-testid={"menu-option"}
        >
          {options.map((option) => (
            <Box
              key={option.value}
              onClick={() => handleSelect(option)}
              sx={{
                padding: theme.spacing(0.5),
                borderBottom: "1px solid " + theme.palette.neutral,
                "&:hover": {
                  ...(selectedOption !== option.value && {
                    background: theme.palette.neutral,
                  }),
                },
                ...(selectedOption === option.value && {
                  background: theme.palette.primary.main,
                  color: "white",
                }),
              }}
            >
              {option.title}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
}

export default FilterMenu;
