import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
const Donations = () => (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Donations</h2>
      <p className="mb-4">Support our mission by donating books or making a financial contribution.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Book Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We accept gently used books to expand our collection.</p>
            <Button className="mt-2">Learn More</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Financial Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your monetary donations help us improve our services and facilities.</p>
            <Button className="mt-2">Donate Now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  export default Donations;