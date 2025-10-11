function Footer() {
  return (
    <footer className="bg-teal-900 text-center py-5 px-6 mt-auto font-serif">
      <p className="text-sm text-amber-200/80 font-semibold">
        © {new Date().getFullYear()} Panchangam. All rights reserved.
      </p>
    </footer>
  );
}
export default Footer;

