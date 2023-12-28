import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import ExpandableDropdown from "../components/ExpandableDropdown";

const ComponentPreviews = () => {
  return (
      <Previews palette={<PaletteTree/>}>
        <ComponentPreview path="/ExpandableDropdown">
          <ExpandableDropdown/>
        </ComponentPreview>
      </Previews>
  )
}

export default ComponentPreviews