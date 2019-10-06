import React, { FC } from 'react';
import { Styled } from 'create-react-web-component';
import { LiveError, LivePreview, LiveProvider } from 'react-live';
import { IComponentAttributes, IComponentProperties } from './componentProperties';
import styles from './App.css';

interface IProps extends IComponentProperties, IComponentAttributes {
}

const App: FC<IProps> = (props: IComponentProperties) => {
  return (
    <Styled styles={styles}>
      <LiveProvider code={props.code}>
        <LiveError className="live-error"/>
        <LivePreview className="live-viewer"/>
      </LiveProvider>
    </Styled>
  );
};

export default App;
