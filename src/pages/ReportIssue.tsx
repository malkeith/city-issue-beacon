import { useState } from "react";
import { Camera, MapPin, Mic, Upload, AlertCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "pothole", label: "Pothole", color: "category-pothole" },
  { value: "garbage", label: "Garbage Collection", color: "category-garbage" },
  { value: "streetlight", label: "Street Light", color: "category-streetlight" },
  { value: "water", label: "Water Issues", color: "category-water" },
  { value: "traffic", label: "Traffic Signal", color: "category-traffic" },
  { value: "other", label: "Other", color: "category-other" },
];

export default function ReportIssue() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    photos: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newFiles].slice(0, 5) // Max 5 photos
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const detectLocation = () => {
    setLocationDetected(true);
    setFormData(prev => ({
      ...prev,
      location: "123 Main Street, Downtown (Auto-detected)"
    }));
    toast({
      title: "Location detected",
      description: "Your current location has been automatically added.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.description) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Issue reported successfully!",
        description: "Your issue has been submitted and will be reviewed by the authorities.",
      });
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
        photos: [],
      });
      setLocationDetected(false);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Report an Issue</h1>
          <p className="text-muted-foreground">
            Help improve your community by reporting civic issues
          </p>
        </div>

        <Card className="bg-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Issue Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title *</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-background border-input-border"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger className="bg-background border-input-border">
                    <SelectValue placeholder="Select issue category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${category.color}`}></div>
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Address or describe the location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="bg-background border-input-border flex-1"
                  />
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={detectLocation}
                    disabled={locationDetected}
                    className="shrink-0"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {locationDetected ? "Detected" : "Auto-detect"}
                  </Button>
                </div>
                {locationDetected && (
                  <Badge variant="outline" className="text-success border-success/20 bg-success/10">
                    Location automatically detected
                  </Badge>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-background border-input-border min-h-24"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Photos (Optional)</Label>
                <div className="border-2 border-dashed border-input-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload photos or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Max 5 photos, PNG or JPG up to 10MB each
                    </p>
                  </label>
                </div>

                {/* Photo previews */}
                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePhoto(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Voice Note */}
              <div className="space-y-2">
                <Label>Voice Note (Optional)</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-center"
                  disabled
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Record Voice Note (Coming Soon)
                </Button>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 flex-1"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Report Issue
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      location: "",
                      photos: [],
                    });
                    setLocationDetected(false);
                  }}
                >
                  Clear
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}