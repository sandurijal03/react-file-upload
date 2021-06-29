import styled from 'styled-components';

import FileUpload from './components/FileUpload';

const App = () => {
  return (
    <AppStyled className='container mt-4'>
      <h4 className='display-4 text-center mb-4'>
        <i className='fab fa-react' />
        React File Upload
      </h4>
      <FileUpload />
    </AppStyled>
  );
};

const AppStyled = styled.div``;

export default App;
