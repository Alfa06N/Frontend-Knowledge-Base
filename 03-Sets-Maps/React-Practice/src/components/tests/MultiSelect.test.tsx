import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelect } from "../MultiSelect";

describe("MultiSelect Component", () => {
  it("should toggle selection and update UI", async () => {
    const user = userEvent.setup();
    render(<MultiSelect />);

    const userElement = screen.getByText("User 1");

    expect(screen.getByText(/selected users: 0/i)).toBeInTheDocument();
    expect(userElement).toBeInTheDocument();

    await userEvent.click(userElement);

    expect(screen.getByText(/selected users: 1/i)).toBeInTheDocument();
    expect(userElement).toHaveTextContent("✔️");

    await user.click(userElement);
    expect(screen.getByText(/selected users: 0/i)).toBeInTheDocument();
    expect(userElement).not.toHaveTextContent("✔️");
  });
});
