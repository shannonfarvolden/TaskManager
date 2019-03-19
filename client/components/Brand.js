const Brand = props => (
  <div className="brand">
    <span className="brand-drf">DRF</span> <span style={{ display: props.collapsed ? 'none' : 'inline-block' }}>TRACKER</span>
  </div>
);

export default Brand;
