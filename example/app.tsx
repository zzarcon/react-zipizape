import * as React from 'react';
import {useState} from 'react';
import {GHCorner} from 'react-gh-corner';
import {AppWrapper, GlobalStyles} from './styled';
import { Zipizape } from '../src';

export interface AppState {
  
}

const repoUrl = 'https://github.com/react-zipizape';

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const onChange = (event: any) => { // ChangeEvent<HTMLInputElement>
    const firstFile = event.target.files[0];

    setSelectedFile(firstFile);
  };
  const renderZipizape = () => {
    if (!selectedFile) return null;

    return (
      <Zipizape file={selectedFile}>
        {(result) => {
          if (result.status === 'pending') {
            return (
              <div>loading entries...</div>
            )
          }

          const {entries} = result;
          const content = entries.map(({name}) => <div key={name}>{name}</div>);

          return (
            <div>
              <h3>Zip files:</h3>
              {content}
            </div>
          )
        }}
      </Zipizape>
    )
  }

  return (
    <AppWrapper>
      <GlobalStyles />
      <GHCorner openInNewTab href={repoUrl} />
      <input type="file" onChange={onChange} />
      {renderZipizape()}
    </AppWrapper>
  )
}

export default App;