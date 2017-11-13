require "rails_helper"

RSpec.describe "user deletes account", type: :system, js: true do
  it "notifies the user the account was deleted" do
    user = create_user(email: "user@example.com", password: "password")
    sign_in(user)
    visit edit_user_registration_path
    click_button("Cancel account")
    click_button("Confirm")
    expect(page).to have_content("Bye! Your account has been successfully cancelled. We hope to see you again soon.")
  end
end
