export default function Alert(properties: { message: string, class: string }) {
    return (
        <div className={properties.class}>{properties.message}</div>
    )
}