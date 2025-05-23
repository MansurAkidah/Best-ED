
( function () {

        var Akida = function () {
            debugger;
            var self = this;
        
            // EmailJS Configuration - REPLACE THESE WITH YOUR ACTUAL VALUES
            self.emailjsConfig = {
                publicKey: 'gn6RCJ7AimpPDC8qL',    
                serviceId: 'service_k4dwqon',      
                templateId: 'template_l2bws4l'                 
            };
    
            
            // Form data observables
            self.formData = {
                name: ko.observable(''),
                email: ko.observable(''),
                subject: ko.observable(''),
                message: ko.observable('')
            };
            
            // State observables
            self.isLoading = ko.observable(false);
            self.showError = ko.observable(false);
            self.showSuccess = ko.observable(false);
            self.errorMessage = ko.observable('');
            
            // Validation errors
            self.errors = {
                name: ko.observable(''),
                email: ko.observable(''),
                subject: ko.observable(''),
                message: ko.observable('')
            };
            
            // Validation functions
            self.validateEmail = function(email) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            };
            
            self.validateForm = function() {
                var isValid = true;
                debugger;
                // Clear previous errors
                self.errors.name('');
                self.errors.email('');
                self.errors.subject('');
                self.errors.message('');
                
                // Validate name
                if (!self.formData.name() || self.formData.name().trim() === '') {
                    self.errors.name('Name is required');
                    isValid = false;
                }
                
                // Validate email
                if (!self.formData.email() || self.formData.email().trim() === '') {
                    self.errors.email('Email is required');
                    isValid = false;
                } else if (!self.validateEmail(self.formData.email())) {
                    self.errors.email('Please enter a valid email address');
                    isValid = false;
                }
                
                // Validate subject
                if (!self.formData.subject() || self.formData.subject().trim() === '') {
                    self.errors.subject('Subject is required');
                    isValid = false;
                }
                
                // Validate message
                if (!self.formData.message() || self.formData.message().trim() === '') {
                    self.errors.message('Message is required');
                    isValid = false;
                } else if (self.formData.message().trim().length < 10) {
                    self.errors.message('Message must be at least 10 characters long');
                    isValid = false;
                }
                debugger;
                return isValid;
            };
            
            // Submit form function
            self.submitForm = function() {
                // Reset states
                self.showError(false);
                self.showSuccess(false);
                
                // Validate form
                if (!self.validateForm()) {
                    return;
                }
                
                // Show loading state
                self.isLoading(true);
                
                // Prepare form data
                var formDataToSend = {
                    name: self.formData.name().trim(),
                    email: self.formData.email().trim(),
                    subject: self.formData.subject().trim(),
                    message: self.formData.message().trim(),
                    timestamp: new Date().toISOString()
                };
                debugger;
                // Simulate sending email (replace with your actual email service)
                self.sendEmail(formDataToSend);
            };
            
            // Email sending function using EmailJS
            self.sendEmail = function(data) {
                debugger;
                // Initialize EmailJS with your public key
                emailjs.init(self.emailjsConfig.publicKey);
                // Send email using EmailJS
                emailjs.send(
                    self.emailjsConfig.serviceId, 
                    self.emailjsConfig.templateId, 
                    {
                        name: data.name,
                        email: data.email,
                        subject: data.subject,
                        message: data.message,
                        timestamp: data.timestamp
                    }
                    )
                    .then(function(response) {
                        console.log('Email sent successfully:', response);
                        debugger;
                        self.handleSuccess();
                    })
                    .catch(function(error) {
                        debugger;
                        console.error('Email send failed:', error);
                        self.handleError('Failed to send message. Please try again later.');
                    });
            };
            
            // Success handler
            self.handleSuccess = function() {
                self.isLoading(false);
                self.showSuccess(true);
                
                // Clear form
                self.formData.name('');
                self.formData.email('');
                self.formData.subject('');
                self.formData.message('');
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    self.showSuccess(false);
                }, 5000);
            };
            
            // Error handler
            self.handleError = function(message) {
                self.isLoading(false);
                self.errorMessage(message);
                self.showError(true);
                
                // Hide error message after 5 seconds
                setTimeout(function() {
                    self.showError(false);
                }, 5000);
            };
        }
        var mansur = new Akida();
        ko.applyBindings(mansur);
    })();