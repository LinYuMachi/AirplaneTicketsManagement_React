import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ListSubheader,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandableListSubheader = ({ label, isOpen, toggleOpen }) => {
  return (
      <div
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={toggleOpen}
      >
        <ListSubheader style={{ flex: 1 }}>{label}</ListSubheader>
        <ExpandMoreIcon style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </div>
  );
};
ExpandableListSubheader.muiSkipListHighlight = true;

const ExpandableDropdown = ({ label, groupNames, groupItems, selectProps, formProps }) => {
  const [openGroups, setOpenGroups] = useState([]);

  const handleGroupToggle = (group) => {
    if (openGroups.includes(group)) {
      setOpenGroups(openGroups.filter((item) => item !== group));
    } else {
      setOpenGroups([...openGroups, group]);
    }
  };

  return (
      <FormControl  {...formProps} >
        <InputLabel>{label}</InputLabel>
        <Select {...selectProps} >
          {groupNames.map((groupName, index) => (
              [
                <ExpandableListSubheader
                    label={groupName}
                    isOpen={openGroups.includes(groupName)}
                    toggleOpen={() => handleGroupToggle(groupName)}
                />,
                openGroups.includes(groupName) &&
                    groupItems[index].map((item, itemIndex) => (
                        <MenuItem key={itemIndex} value={item}>
                          {item}
                        </MenuItem>
                    ))
              ]
          ))}
        </Select>
      </FormControl>
  );
};


export default ExpandableDropdown;