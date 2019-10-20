import {useState, useEffect, ReactElement} from 'react';
import {ZipiZape, ZipEntry} from 'zipizape';

export interface PendingResult {
  status: 'pending';
}

export interface ResolvedResult {
  status: 'resolved';
  entries: ZipEntry[];
}

export type ZipResult = PendingResult | ResolvedResult;

export interface ZipizapeProps {
  file: File;
  children: (result: ZipResult) => ReactElement;
}

const zipizape = new ZipiZape();

export const Zipizape = (props: ZipizapeProps) => {
  const {file, children} = props;
  const [result, setResult] = useState<ZipResult>({status: 'pending'});

  useEffect(() => {
    zipizape.readFile(file).then(entries => {
      setResult({
        status: 'resolved',
        entries
      })
    });
  }, [file]);

  return (
    children(result)
  );
}