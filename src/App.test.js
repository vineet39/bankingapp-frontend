import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Deposit from './deposit';

describe('DepositButton', () => {
  it('triggers an alert saying "Deposit is successful" on deposit', async () => {
    const mockDeposit = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(() => {}); 

    render(<Deposit onDeposit={mockDeposit} />);

    const input = screen.getByPlaceholderText('Enter amount');
    fireEvent.change(input, { target: { value: 100 } });

    const button = screen.getByRole('button', { name: /deposit/i });
    await userEvent.click(button); // Using userEvent for a more user-like interaction

    expect(window.alert).toHaveBeenCalledWith("Deposit is successful");

    window.alert.mockRestore(); // Clean up the mock
  });
});
