
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Trash2, Upload, Save, PlusCircle, ChevronDown, Globe, CreditCard, Mail, Phone, MapPin, Users, Settings, Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SiteConfig = () => {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "Xible Store",
    storeEmail: "contact@xiblestore.com",
    storePhone: "+1 (555) 123-4567",
    storeCurrency: "USD",
    defaultLanguage: "en",
    timezone: "UTC",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    allowGuestCheckout: true,
    maintenanceMode: false
  });

  const [locationSettings, setLocationSettings] = useState({
    country: "US",
    storeAddress: "123 Commerce St, New York, NY 10001",
    googleMapsApiKey: "",
    countries: ["US", "CA", "MX", "BR"],
    defaultShippingZone: "domestic"
  });

  const [emailSettings, setEmailSettings] = useState({
    fromName: "Xible Store",
    fromEmail: "notifications@xiblestore.com",
    adminEmail: "admin@xiblestore.com",
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "smtp_user",
    smtpPassword: "********",
    smtpEncryption: "tls",
    emailFooter: "© 2023 Xible Store. All rights reserved.",
    sendWelcomeEmail: true,
    sendOrderConfirmation: true,
    sendShippingNotifications: true
  });

  const [paymentSettings, setPaymentSettings] = useState({
    enabledMethods: ["credit_card", "paypal"],
    testMode: true,
    currency: "USD",
    currencySymbol: "$",
    currencyPosition: "before",
    thousandSeparator: ",",
    decimalSeparator: ".",
    numberOfDecimals: 2,
    minimumOrderAmount: 10
  });

  const [userSettings, setUserSettings] = useState({
    allowUserRegistration: true,
    requireEmailVerification: true,
    enableTwoFactorAuth: false,
    passwordMinLength: 8,
    passwordRequiresNumber: true,
    passwordRequiresSymbol: true,
    accountDeletionPolicy: "soft_delete",
    userRoles: ["customer", "admin"]
  });

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleGeneralSettingsToggle = (name: string, checked: boolean) => {
    setGeneralSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleGeneralSettingsSelect = (name: string, value: string) => {
    setGeneralSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocationSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationSettingsSelect = (name: string, value: string) => {
    setLocationSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleEmailSettingsToggle = (name: string, checked: boolean) => {
    setEmailSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleEmailSettingsSelect = (name: string, value: string) => {
    setEmailSettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPaymentSettings(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSettingsToggle = (name: string, checked: boolean) => {
    setPaymentSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handlePaymentSettingsSelect = (name: string, value: string) => {
    setPaymentSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleUserSettingsToggle = (name: string, checked: boolean) => {
    setUserSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handleUserSettingsSelect = (name: string, value: string) => {
    setUserSettings(prev => ({ ...prev, [name]: value }));
  };

  const saveSettings = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${section} settings have been updated successfully`
    });
  };

  const currencyOptions = [
    { value: "USD", label: "US Dollar (USD)" },
    { value: "EUR", label: "Euro (EUR)" },
    { value: "GBP", label: "British Pound (GBP)" },
    { value: "JPY", label: "Japanese Yen (JPY)" },
    { value: "CAD", label: "Canadian Dollar (CAD)" },
    { value: "AUD", label: "Australian Dollar (AUD)" },
    { value: "BRL", label: "Brazilian Real (BRL)" }
  ];

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "pt", label: "Portuguese" },
    { value: "es", label: "Spanish" }
  ];

  const timezoneOptions = [
    { value: "UTC", label: "UTC" },
    { value: "America/New_York", label: "America/New_York (GMT-5)" },
    { value: "America/Los_Angeles", label: "America/Los_Angeles (GMT-8)" },
    { value: "Europe/London", label: "Europe/London (GMT)" },
    { value: "Europe/Paris", label: "Europe/Paris (GMT+1)" },
    { value: "Asia/Tokyo", label: "Asia/Tokyo (GMT+9)" },
    { value: "Australia/Sydney", label: "Australia/Sydney (GMT+10)" },
    { value: "America/Sao_Paulo", label: "America/Sao_Paulo (GMT-3)" }
  ];

  const countryOptions = [
    { value: "US", label: "United States" },
    { value: "CA", label: "Canada" },
    { value: "MX", label: "Mexico" },
    { value: "BR", label: "Brazil" },
    { value: "UK", label: "United Kingdom" },
    { value: "FR", label: "France" },
    { value: "DE", label: "Germany" },
    { value: "JP", label: "Japan" },
    { value: "AU", label: "Australia" }
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Store Configuration</h1>
        <p className="text-muted-foreground">Manage your store's settings and configurations</p>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">
              <Settings className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="location">
              <MapPin className="h-4 w-4 mr-2" />
              Location
            </TabsTrigger>
            <TabsTrigger value="email">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Store Settings</CardTitle>
                <CardDescription>Configure basic information about your store</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input 
                      id="storeName" 
                      name="storeName" 
                      value={generalSettings.storeName} 
                      onChange={handleGeneralSettingsChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeEmail">Store Email</Label>
                    <Input 
                      id="storeEmail" 
                      name="storeEmail" 
                      type="email" 
                      value={generalSettings.storeEmail} 
                      onChange={handleGeneralSettingsChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storePhone">Store Phone</Label>
                    <Input 
                      id="storePhone" 
                      name="storePhone" 
                      value={generalSettings.storePhone} 
                      onChange={handleGeneralSettingsChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeCurrency">Store Currency</Label>
                    <Select 
                      value={generalSettings.storeCurrency} 
                      onValueChange={(value) => handleGeneralSettingsSelect('storeCurrency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultLanguage">Default Language</Label>
                    <Select 
                      value={generalSettings.defaultLanguage} 
                      onValueChange={(value) => handleGeneralSettingsSelect('defaultLanguage', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languageOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select 
                      value={generalSettings.timezone} 
                      onValueChange={(value) => handleGeneralSettingsSelect('timezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        {timezoneOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Store Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="border rounded-md overflow-hidden w-20 h-20 flex items-center justify-center bg-white">
                        <img 
                          src={generalSettings.logo} 
                          alt="Store Logo" 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" /> Upload Logo
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Favicon</Label>
                    <div className="flex items-center gap-4">
                      <div className="border rounded-md overflow-hidden w-10 h-10 flex items-center justify-center bg-white">
                        <img 
                          src={generalSettings.favicon} 
                          alt="Favicon" 
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <Button variant="outline">
                        <Upload className="h-4 w-4 mr-2" /> Upload Favicon
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Recommended size: 32x32 or 64x64 pixels</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Store Behavior</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label>Allow Guest Checkout</Label>
                        <p className="text-xs text-muted-foreground">Let customers check out without creating an account</p>
                      </div>
                      <Switch 
                        checked={generalSettings.allowGuestCheckout} 
                        onCheckedChange={(checked) => handleGeneralSettingsToggle('allowGuestCheckout', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <Label>Maintenance Mode</Label>
                        <p className="text-xs text-muted-foreground">Take your store offline for maintenance</p>
                      </div>
                      <Switch 
                        checked={generalSettings.maintenanceMode} 
                        onCheckedChange={(checked) => handleGeneralSettingsToggle('maintenanceMode', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => saveSettings('general')} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" /> Save General Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Location Settings Tab */}
          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Location Settings</CardTitle>
                <CardDescription>Configure your store's location and geographic settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Store Country</Label>
                    <Select 
                      value={locationSettings.country} 
                      onValueChange={(value) => handleLocationSettingsSelect('country', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeAddress">Store Address</Label>
                    <Textarea 
                      id="storeAddress" 
                      name="storeAddress" 
                      value={locationSettings.storeAddress} 
                      onChange={handleLocationSettingsChange} 
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="googleMapsApiKey">Google Maps API Key</Label>
                  <Input 
                    id="googleMapsApiKey" 
                    name="googleMapsApiKey" 
                    value={locationSettings.googleMapsApiKey} 
                    onChange={handleLocationSettingsChange} 
                    type="password"
                  />
                  <p className="text-xs text-muted-foreground">Used for store locator and address validation</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Selling Countries</Label>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Country
                    </Button>
                  </div>
                  <ScrollArea className="h-40 w-full border rounded-md p-4">
                    {locationSettings.countries.map((country, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                        <span>{countryOptions.find(c => c.value === country)?.label || country}</span>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultShippingZone">Default Shipping Zone</Label>
                  <Select 
                    value={locationSettings.defaultShippingZone} 
                    onValueChange={(value) => handleLocationSettingsSelect('defaultShippingZone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select shipping zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="north_america">North America</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="worldwide">Worldwide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => saveSettings('location')} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" /> Save Location Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Email Settings Tab */}
          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure email services and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input 
                      id="fromName" 
                      name="fromName" 
                      value={emailSettings.fromName} 
                      onChange={handleEmailSettingsChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input 
                      id="fromEmail" 
                      name="fromEmail" 
                      type="email" 
                      value={emailSettings.fromEmail} 
                      onChange={handleEmailSettingsChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input 
                      id="adminEmail" 
                      name="adminEmail" 
                      type="email" 
                      value={emailSettings.adminEmail} 
                      onChange={handleEmailSettingsChange} 
                    />
                    <p className="text-xs text-muted-foreground">Receives order notifications and alerts</p>
                  </div>
                </div>

                <Separator />

                <Collapsible className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">SMTP Settings</h3>
                    <CollapsibleTrigger className="hover:bg-accent rounded-md p-1">
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtpHost">SMTP Host</Label>
                        <Input 
                          id="smtpHost" 
                          name="smtpHost" 
                          value={emailSettings.smtpHost} 
                          onChange={handleEmailSettingsChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtpPort">SMTP Port</Label>
                        <Input 
                          id="smtpPort" 
                          name="smtpPort" 
                          value={emailSettings.smtpPort} 
                          onChange={handleEmailSettingsChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtpUsername">SMTP Username</Label>
                        <Input 
                          id="smtpUsername" 
                          name="smtpUsername" 
                          value={emailSettings.smtpUsername} 
                          onChange={handleEmailSettingsChange} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtpPassword">SMTP Password</Label>
                        <Input 
                          id="smtpPassword" 
                          name="smtpPassword" 
                          type="password" 
                          value={emailSettings.smtpPassword} 
                          onChange={handleEmailSettingsChange} 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpEncryption">Encryption</Label>
                      <RadioGroup defaultValue={emailSettings.smtpEncryption} onValueChange={(value) => handleEmailSettingsSelect('smtpEncryption', value)}>
                        <div className="flex items-center space-x-8">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="encryption-none" />
                            <Label htmlFor="encryption-none">None</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="ssl" id="encryption-ssl" />
                            <Label htmlFor="encryption-ssl">SSL</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="tls" id="encryption-tls" />
                            <Label htmlFor="encryption-tls">TLS</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Test Connection</Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="emailFooter">Email Footer</Label>
                  <Textarea 
                    id="emailFooter" 
                    name="emailFooter" 
                    value={emailSettings.emailFooter} 
                    onChange={handleEmailSettingsChange} 
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Email Notifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label>Welcome Email</Label>
                        <p className="text-xs text-muted-foreground">Send to new customers after registration</p>
                      </div>
                      <Switch 
                        checked={emailSettings.sendWelcomeEmail} 
                        onCheckedChange={(checked) => handleEmailSettingsToggle('sendWelcomeEmail', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label>Order Confirmation</Label>
                        <p className="text-xs text-muted-foreground">Send after order is placed</p>
                      </div>
                      <Switch 
                        checked={emailSettings.sendOrderConfirmation} 
                        onCheckedChange={(checked) => handleEmailSettingsToggle('sendOrderConfirmation', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label>Shipping Notifications</Label>
                        <p className="text-xs text-muted-foreground">Send updates when order ships</p>
                      </div>
                      <Switch 
                        checked={emailSettings.sendShippingNotifications} 
                        onCheckedChange={(checked) => handleEmailSettingsToggle('sendShippingNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => saveSettings('email')} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" /> Save Email Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Payment Settings Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and currency settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Payment Methods</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <h4 className="font-medium">Credit Card</h4>
                            <p className="text-xs text-muted-foreground">Accept Visa, Mastercard, Amex, etc.</p>
                          </div>
                        </div>
                        <Switch 
                          checked={paymentSettings.enabledMethods.includes('credit_card')} 
                          onCheckedChange={(checked) => {
                            const methods = checked 
                              ? [...paymentSettings.enabledMethods, 'credit_card'] 
                              : paymentSettings.enabledMethods.filter(m => m !== 'credit_card');
                            setPaymentSettings(prev => ({ ...prev, enabledMethods: methods }));
                          }}
                        />
                      </div>
                      {paymentSettings.enabledMethods.includes('credit_card') && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center justify-between">
                              <Label>Test Mode</Label>
                              <Switch 
                                checked={paymentSettings.testMode} 
                                onCheckedChange={(checked) => handlePaymentSettingsToggle('testMode', checked)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>API Keys</Label>
                              <div className="space-y-2">
                                <Input placeholder="Public Key" />
                                <Input placeholder="Secret Key" type="password" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="4" fill="#003087" />
                            <path d="M7 15.5H9.5L10 13H7.5L7 15.5Z" fill="white" />
                            <path d="M9.5 8.5H7L6.5 11H9L9.5 8.5Z" fill="white" />
                            <path d="M14.5 8.5H12L10 15.5H12.5L14.5 8.5Z" fill="white" />
                            <path d="M17 8.5H14.5L12.5 15.5H15L17 8.5Z" fill="white" />
                          </svg>
                          <div>
                            <h4 className="font-medium">PayPal</h4>
                            <p className="text-xs text-muted-foreground">Accept payments via PayPal</p>
                          </div>
                        </div>
                        <Switch 
                          checked={paymentSettings.enabledMethods.includes('paypal')} 
                          onCheckedChange={(checked) => {
                            const methods = checked 
                              ? [...paymentSettings.enabledMethods, 'paypal'] 
                              : paymentSettings.enabledMethods.filter(m => m !== 'paypal');
                            setPaymentSettings(prev => ({ ...prev, enabledMethods: methods }));
                          }}
                        />
                      </div>
                      {paymentSettings.enabledMethods.includes('paypal') && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label>Client ID</Label>
                              <Input placeholder="PayPal Client ID" />
                            </div>
                            <div className="space-y-2">
                              <Label>Secret</Label>
                              <Input placeholder="PayPal Secret" type="password" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Payment Method
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Currency Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select 
                        value={paymentSettings.currency} 
                        onValueChange={(value) => handlePaymentSettingsSelect('currency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencyOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currencySymbol">Currency Symbol</Label>
                      <Input 
                        id="currencySymbol" 
                        name="currencySymbol" 
                        value={paymentSettings.currencySymbol} 
                        onChange={handlePaymentSettingsChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currencyPosition">Symbol Position</Label>
                      <Select 
                        value={paymentSettings.currencyPosition} 
                        onValueChange={(value) => handlePaymentSettingsSelect('currencyPosition', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="before">Before ($100)</SelectItem>
                          <SelectItem value="after">After (100$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfDecimals">Decimal Places</Label>
                      <Select 
                        value={String(paymentSettings.numberOfDecimals)} 
                        onValueChange={(value) => handlePaymentSettingsSelect('numberOfDecimals', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select decimal places" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="thousandSeparator">Thousand Separator</Label>
                      <Input 
                        id="thousandSeparator" 
                        name="thousandSeparator" 
                        value={paymentSettings.thousandSeparator} 
                        onChange={handlePaymentSettingsChange} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="decimalSeparator">Decimal Separator</Label>
                      <Input 
                        id="decimalSeparator" 
                        name="decimalSeparator" 
                        value={paymentSettings.decimalSeparator} 
                        onChange={handlePaymentSettingsChange} 
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="minimumOrderAmount">Minimum Order Amount</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      {paymentSettings.currencySymbol}
                    </span>
                    <Input 
                      id="minimumOrderAmount" 
                      name="minimumOrderAmount" 
                      type="number" 
                      value={paymentSettings.minimumOrderAmount} 
                      onChange={handlePaymentSettingsChange} 
                      className="rounded-l-none" 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum amount required to place an order</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => saveSettings('payment')} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" /> Save Payment Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* User Settings Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Settings</CardTitle>
                <CardDescription>Configure user accounts and registration settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Registration Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label>Allow Registrations</Label>
                        <p className="text-xs text-muted-foreground">Enable new user sign-ups</p>
                      </div>
                      <Switch 
                        checked={userSettings.allowUserRegistration} 
                        onCheckedChange={(checked) => handleUserSettingsToggle('allowUserRegistration', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label>Email Verification</Label>
                        <p className="text-xs text-muted-foreground">Require email verification for new accounts</p>
                      </div>
                      <Switch 
                        checked={userSettings.requireEmailVerification} 
                        onCheckedChange={(checked) => handleUserSettingsToggle('requireEmailVerification', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Password Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength">Minimum Length</Label>
                      <div className="flex items-center space-x-2">
                        <Input 
                          id="passwordMinLength" 
                          name="passwordMinLength" 
                          type="number" 
                          value={userSettings.passwordMinLength} 
                          onChange={handleUserSettingsChange} 
                        />
                        <span>characters</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={userSettings.passwordRequiresNumber} 
                          onCheckedChange={(checked) => handleUserSettingsToggle('passwordRequiresNumber', checked)}
                        />
                        <Label>Require at least one number</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={userSettings.passwordRequiresSymbol} 
                          onCheckedChange={(checked) => handleUserSettingsToggle('passwordRequiresSymbol', checked)}
                        />
                        <Label>Require at least one symbol</Label>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">User Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-xs text-muted-foreground">Enable 2FA for additional security</p>
                      </div>
                      <Switch 
                        checked={userSettings.enableTwoFactorAuth} 
                        onCheckedChange={(checked) => handleUserSettingsToggle('enableTwoFactorAuth', checked)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountDeletionPolicy">Account Deletion Policy</Label>
                      <Select 
                        value={userSettings.accountDeletionPolicy} 
                        onValueChange={(value) => handleUserSettingsSelect('accountDeletionPolicy', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select policy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate Deletion</SelectItem>
                          <SelectItem value="soft_delete">Soft Delete (30 days)</SelectItem>
                          <SelectItem value="admin_approval">Require Admin Approval</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">User Roles</h3>
                    <Button variant="outline" size="sm">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Role
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {userSettings.userRoles.map((role, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-4 border rounded-md">
                        <span className="capitalize">{role}</span>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          {role !== 'admin' && role !== 'customer' && (
                            <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => saveSettings('users')} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" /> Save User Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">SSL Configuration</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Force HTTPS</Label>
                        <p className="text-xs text-muted-foreground">Redirect all HTTP requests to HTTPS</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>HSTS (HTTP Strict Transport Security)</Label>
                        <p className="text-xs text-muted-foreground">Enhance security of HTTPS</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Authentication</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Session Timeout</Label>
                      <Select defaultValue="1440">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="720">12 hours</SelectItem>
                          <SelectItem value="1440">24 hours</SelectItem>
                          <SelectItem value="10080">1 week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Login Attempts</Label>
                        <p className="text-xs text-muted-foreground">Limit login attempts before lockout</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="5" className="w-16 text-center" />
                        <span>attempts</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Password Reset</Label>
                        <p className="text-xs text-muted-foreground">Set token expiration time</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="24" className="w-16 text-center" />
                        <span>hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">GDPR Compliance</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Cookie Consent</Label>
                        <p className="text-xs text-muted-foreground">Show cookie consent banner</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Privacy Policy</Label>
                        <p className="text-xs text-muted-foreground">Require acceptance during registration</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Data Export</Label>
                        <p className="text-xs text-muted-foreground">Allow users to download their data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">API Security</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>API Access</Label>
                        <p className="text-xs text-muted-foreground">Enable API endpoints</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <Label>API Rate Limiting</Label>
                      <div className="flex items-center space-x-2">
                        <Input type="number" defaultValue="100" className="w-24 text-center" />
                        <span>requests per</span>
                        <Select defaultValue="minute">
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="second">Second</SelectItem>
                            <SelectItem value="minute">Minute</SelectItem>
                            <SelectItem value="hour">Hour</SelectItem>
                            <SelectItem value="day">Day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline">
                        <PlusCircle className="h-4 w-4 mr-2" /> Generate API Key
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => saveSettings('security')} className="ml-auto">
                  <Save className="h-4 w-4 mr-2" /> Save Security Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SiteConfig;
