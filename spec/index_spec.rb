require 'spec_helper'

describe "index", type: :feature, js: true do
  before :each do
    visit '/'
  end

  it "has the page title" do
    expect(find('.name').text).to eq('BEN GREENBERG. DEVELOPER ADVOCATE.')
  end

  it "has the page skills" do
    expect(find('.skills').text).to eq('Software Developer - Advocate - Educator')
  end
end