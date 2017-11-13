require "rails_helper"

RSpec.describe "user requests password reset email", type: :system, js: true do
  context "and enters a valid email address" do
    it "sends password reset instructions" do
      user = create_user(email: "user@example.com", password: "password")
      request_password_reset_instructions(email: user.email)
      expect(page).to have_content("You will receive an email with instructions on how to reset your password in a few minutes.")
    end
  end
  context "but enters an invalid email address" do
    it "shows the user an error" do
      request_password_reset_instructions(email: "nonexistentuser@example.com")
      expect(page).to have_content("Email not found")
    end
  end
end
