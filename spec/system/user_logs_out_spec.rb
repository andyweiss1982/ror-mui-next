require "rails_helper"

RSpec.describe "user logs out", type: :system, js: true do

  it "redirects the user to the login page" do
    user = create_user(email: "user@example.com", password: "password")
    sign_in(user)
    visit root_path
    click_button("user_menu")
    click_link("Logout")
    expect(page).to have_content("Signed out successfully.")
  end

end
