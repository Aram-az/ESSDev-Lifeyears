import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PageTitle } from '../components/ui/PageTitle';
import { SectionTitle } from '../components/ui/SectionTitle';

/**
 * UI Playground / Style Guide Page
 * 
 * This page showcases all UI components with their variants and states.
 * Accessible at /styleguide-temp
 */
export default function StyleGuideTemp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <PageTitle subtitle="Interactive component showcase and design system reference">
          UI Component Playground
        </PageTitle>

        {/* Buttons Section */}
        <section className="space-y-6">
          <SectionTitle subtitle="All button variants and sizes">
            Buttons
          </SectionTitle>
          
          <Card>
            <Card.Body>
              <div className="space-y-8">
                {/* Button Variants */}
                <div>
                  <h3 className="text-sm font-semibold text-brand-text mb-4">Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="primary" disabled>Disabled</Button>
                  </div>
                </div>

                {/* Button Sizes */}
                <div>
                  <h3 className="text-sm font-semibold text-brand-text mb-4">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm" variant="primary">Small</Button>
                    <Button size="md" variant="primary">Medium</Button>
                    <Button size="lg" variant="primary">Large</Button>
                  </div>
                </div>

                {/* Button States */}
                <div>
                  <h3 className="text-sm font-semibold text-brand-text mb-4">States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Normal</Button>
                    <Button variant="primary" disabled>Disabled</Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Inputs Section */}
        <section className="space-y-6">
          <SectionTitle subtitle="Form inputs with labels and error states">
            Inputs
          </SectionTitle>
          
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                />

                <Input
                  label="Read-only Field"
                  placeholder="Cannot be edited"
                  disabled
                />

                <div className="flex gap-3 pt-4">
                  <Button type="submit" variant="primary">Submit Form</Button>
                  <Button type="button" variant="secondary" onClick={() => {
                    setFormData({ name: '', email: '', phone: '' });
                    setErrors({});
                  }}>
                    Reset
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </section>

        {/* Cards Section */}
        <section className="space-y-6">
          <SectionTitle subtitle="Card components with header, body, and footer">
            Cards
          </SectionTitle>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Card */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold text-lg text-brand-text">Card with All Sections</h3>
                <p className="text-sm text-brand-text-light mt-1">This card has header, body, and footer</p>
              </Card.Header>
              <Card.Body>
                <p className="text-sm text-brand-text">
                  This is the main content area of the card. You can put any content here.
                </p>
              </Card.Body>
              <Card.Footer>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Action</Button>
                  <Button size="sm" variant="primary">Primary</Button>
                </div>
              </Card.Footer>
            </Card>

            {/* Simple Card */}
            <Card>
              <Card.Body>
                <h3 className="font-semibold text-lg text-brand-text mb-2">Simple Card</h3>
                <p className="text-sm text-brand-text">
                  This card only has a body section. No header or footer needed.
                </p>
              </Card.Body>
            </Card>

            {/* Appointment Card Example */}
            <Card>
              <Card.Header>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-brand-text">Annual Physical Exam</h3>
                    <p className="text-sm text-brand-text-light mt-1">Preventative Health</p>
                  </div>
                  <Badge variant="confirmed">Confirmed</Badge>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="space-y-2">
                  <p className="text-sm">
                    <strong className="text-brand-text">Provider:</strong>{' '}
                    <span className="text-brand-text-light">Dr. Sarah Johnson</span>
                  </p>
                  <p className="text-sm">
                    <strong className="text-brand-text">Date:</strong>{' '}
                    <span className="text-brand-text-light">Tue, Nov 19, 2024 at 10:00 AM</span>
                  </p>
                  <p className="text-sm">
                    <strong className="text-brand-text">Location:</strong>{' '}
                    <span className="text-brand-text-light">123 Health St, Suite 200</span>
                  </p>
                </div>
              </Card.Body>
              <Card.Footer>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Reschedule</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              </Card.Footer>
            </Card>

            {/* Card with Error State */}
            <Card>
              <Card.Header>
                <h3 className="font-semibold text-lg text-brand-text">Card with Status</h3>
              </Card.Header>
              <Card.Body>
                <div className="space-y-3">
                  <p className="text-sm text-brand-text">
                    This card demonstrates different status badges.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="confirmed">Confirmed</Badge>
                    <Badge variant="pending">Pending</Badge>
                    <Badge variant="cancelled">Cancelled</Badge>
                    <Badge variant="overdue">Overdue</Badge>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <SectionTitle subtitle="Status indicators and tags">
            Badges
          </SectionTitle>
          
          <Card>
            <Card.Body>
              <div className="space-y-6">
                {/* Status Variants */}
                <div>
                  <h3 className="text-sm font-semibold text-brand-text mb-4">Status Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="confirmed">Confirmed</Badge>
                    <Badge variant="pending">Pending</Badge>
                    <Badge variant="cancelled">Cancelled</Badge>
                    <Badge variant="overdue">Overdue</Badge>
                  </div>
                </div>

                {/* General Variants */}
                <div>
                  <h3 className="text-sm font-semibold text-brand-text mb-4">General Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="brand">Brand</Badge>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="space-y-6">
          <SectionTitle subtitle="Page and section headings">
            Typography
          </SectionTitle>
          
          <Card>
            <Card.Body>
              <div className="space-y-8">
                <div>
                  <PageTitle>Page Title Example</PageTitle>
                </div>
                
                <div>
                  <PageTitle subtitle="This is a subtitle that provides additional context">
                    Page Title with Subtitle
                  </PageTitle>
                </div>

                <div>
                  <SectionTitle>Section Title Example</SectionTitle>
                </div>

                <div>
                  <SectionTitle subtitle="This is a section subtitle">
                    Section Title with Subtitle
                  </SectionTitle>
                </div>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Component Combinations Section */}
        <section className="space-y-6">
          <SectionTitle subtitle="Real-world component combinations">
            Component Combinations
          </SectionTitle>
          
          <Card>
            <Card.Header>
              <PageTitle subtitle="Complete form example with validation">
                User Profile Form
              </PageTitle>
            </Card.Header>
            <Card.Body>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="John" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>
                <Input label="Email Address" type="email" placeholder="john.doe@example.com" />
                <Input label="Phone Number" type="tel" placeholder="(555) 123-4567" />
              </form>
            </Card.Body>
            <Card.Footer>
              <div className="flex gap-3">
                <Button variant="primary">Save Changes</Button>
                <Button variant="secondary">Cancel</Button>
              </div>
            </Card.Footer>
          </Card>
        </section>
      </div>
    </div>
  );
}

