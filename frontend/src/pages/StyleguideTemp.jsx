import { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import PageTitle from '../components/ui/PageTitle';
import SectionTitle from '../components/ui/SectionTitle';

function StyleguideTemp() {
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 0 && value.length < 3) {
      setInputError('Input must be at least 3 characters');
    } else {
      setInputError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Title */}
        <PageTitle
          description="Design system components and usage examples for LifeYears Preventative Health Tracker"
        >
          Design System Playground
        </PageTitle>

        {/* Buttons Section */}
        <section className="space-y-6">
          <SectionTitle
            description="Button variants and sizes"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            }
          >
            Buttons
          </SectionTitle>

          <Card>
            <div className="space-y-6">
              {/* Variants */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary Button</Button>
                  <Button variant="secondary">Secondary Button</Button>
                  <Button variant="outline">Outline Button</Button>
                  <Button variant="disabled">Disabled Button</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm">Small</Button>
                  <Button variant="primary" size="md">Medium</Button>
                  <Button variant="primary" size="lg">Large</Button>
                </div>
              </div>

              {/* Interactive States */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Interactive States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" onClick={() => alert('Clicked!')}>
                    Click Me
                  </Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <SectionTitle
            description="Input fields and Select dropdowns"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            }
          >
            Inputs & Selects
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="space-y-4">
                <Input
                  label="Standard Input"
                  placeholder="Enter text here..."
                  value={inputValue}
                  onChange={handleInputChange}
                />

                <Input
                  label="Required Input"
                  placeholder="This field is required"
                  required
                />

                <Input
                  label="Email Input"
                  type="email"
                  placeholder="example@email.com"
                />

                <Select
                  label="Standard Select"
                  options={[
                    { value: 'option1', label: 'Option 1' },
                    { value: 'option2', label: 'Option 2' },
                    { value: 'option3', label: 'Option 3' },
                  ]}
                />
              </div>
            </Card>

            <Card>
              <div className="space-y-4">
                <Input
                  label="Input with Error"
                  error={inputError}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type less than 3 characters to see error"
                />

                <Input
                  label="Password Input"
                  type="password"
                  placeholder="Enter password"
                />

                <Input
                  label="Input without Label"
                  placeholder="No label above"
                />

                <Select
                  label="Required Select"
                  required
                  options={['Option A', 'Option B', 'Option C']}
                />
              </div>
            </Card>
          </div>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <SectionTitle
            description="Card components with header, body, and footer"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          >
            Cards
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <p className="text-gray-700">
                Simple card with body content only. This is the default card style.
              </p>
            </Card>

            <Card
              header={
                <h3 className="text-lg font-semibold text-gray-900">Card with Header</h3>
              }
            >
              <p className="text-gray-700">
                This card includes a header section with a title. The header is separated by a border.
              </p>
            </Card>

            <Card
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">Save</Button>
                </div>
              }
            >
              <p className="text-gray-700">
                This card includes a footer section with action buttons. The footer is separated by a border.
              </p>
            </Card>

            <Card
              header={
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Complete Card</h3>
                  <Badge variant="confirmed">Active</Badge>
                </div>
              }
              footer={
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last updated: Today</span>
                  <Button variant="primary" size="sm">Action</Button>
                </div>
              }
            >
              <p className="text-gray-700 mb-2">
                This card demonstrates all three sections: header, body, and footer.
              </p>
              <p className="text-sm text-gray-600">
                You can combine multiple components within cards to create rich, interactive interfaces.
              </p>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <SectionTitle
            description="Status badges for appointments and items"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
          >
            Badges
          </SectionTitle>

          <Card>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Badge Variants</h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <Badge variant="confirmed">confirmed</Badge>
                  <Badge variant="pending">pending</Badge>
                  <Badge variant="default">default</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Examples</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700">Appointment Status:</span>
                    <Badge variant="confirmed">confirmed</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700">Appointment Status:</span>
                    <Badge variant="pending">pending</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-700">Item Tag:</span>
                    <Badge variant="default">Tag</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="space-y-6">
          <SectionTitle
            description="Page and section title components"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            }
          >
            Typography
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <PageTitle description="This is a page title with description">
                Page Title Example
              </PageTitle>
            </Card>

            <Card>
              <SectionTitle
                description="This is a section title with description and icon"
                icon={
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                Section Title Example
              </SectionTitle>
            </Card>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="space-y-6">
          <SectionTitle
            description="LifeYears brand color palette"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
          >
            Color Palette
          </SectionTitle>

          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Brand Colors</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`h-16 w-full rounded-lg mb-2 border border-gray-200 bg-brand-${shade}`}
                    />
                    <p className="text-xs font-medium text-gray-700">brand-{shade}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>
    </div>
  );
}

export default StyleguideTemp;

