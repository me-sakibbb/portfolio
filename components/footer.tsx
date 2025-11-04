export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Sakib Ul Hasan</h3>
            <p className="text-muted-foreground">Tech-driven student, leader, and developer</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-muted-foreground text-sm">sakibulhasan159@gmail.com</p>
            <p className="text-muted-foreground text-sm">+880 1938 5038911</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Location</h4>
            <p className="text-muted-foreground text-sm">Mirpur 14, Dhaka, Bangladesh</p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 Sakib Ul Hasan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
