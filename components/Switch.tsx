export const Switch = ({ className = '', children, id, ...rest }: Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>) => {
    return (
        <div className={`form-check form-switch ${className}`}>
            <input type="checkbox" className={`form-check-input`} {...rest} id={id} />
            <label className="form-check-label text-light" htmlFor={id}>{children}</label>
        </div>
    )
}