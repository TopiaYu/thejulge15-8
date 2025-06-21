import { ClipLoader } from 'react-spinners';

interface MySpinnerProps {
  isLoading: boolean;
  size?: number;
  color?: string;
}

function MySpinner({ isLoading, size = 50, color = 'black' }: MySpinnerProps) {
  const overrideCss = {
    display: 'block',
    margin: '0 auto',
  };

  if (!isLoading) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '600px',
        width: '100%',
      }}
    >
      <ClipLoader
        color={color}
        loading={isLoading}
        cssOverride={overrideCss}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default MySpinner;
