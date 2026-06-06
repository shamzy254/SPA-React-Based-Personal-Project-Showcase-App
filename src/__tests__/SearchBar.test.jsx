import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  test('renders placeholder and calls onChange on input', async () => {
    const user = userEvent.setup();
    const changeHandler = jest.fn();

    render(<SearchBar value="" onChange={changeHandler} />);

    const input = screen.getByPlaceholderText(/Search products/i);
    expect(input).toBeInTheDocument();

    await user.type(input, 'Astra');
    expect(changeHandler).toHaveBeenCalled();
  });
});
