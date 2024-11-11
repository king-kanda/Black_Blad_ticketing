<?php
// 1. Make a request to the API
$url = 'http://localhost:8000/api/tickets/1';
$response = file_get_contents($url);

// 2. Decode the JSON response
$ticket_data = json_decode($response, true);

// 3. Display the ticket details on the web page
?>

<!DOCTYPE html>
<html>
<head>
    <title>Ticket Details</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <h1>Ticket Details</h1>
    <table>
        <tr>
            <th>Name</th>
            <td><?php echo $ticket_data['name']; ?></td>
        </tr>
        <tr>
            <th>Phone</th>
            <td><?php echo $ticket_data['phone']; ?></td>
        </tr>
        <tr>
            <th>Email</th>
            <td><?php echo $ticket_data['email']; ?></td>
        </tr>
        <tr>
            <th>Ticket Type</th>
            <td><?php echo $ticket_data['ticket_type']['name']; ?></td>
        </tr>
        <tr>
            <th>Price</th>
            <td>$<?php echo $ticket_data['ticket_type']['price']; ?></td>
        </tr>
        <tr>
            <th>Transaction ID</th>
            <td><?php echo $ticket_data['transaction_id']; ?></td>
        </tr>
        <tr>
            <th>Quantity</th>
            <td><?php echo $ticket_data['quantity']; ?></td>
        </tr>
        <tr>
            <th>Scanned</th>
            <td><?php echo $ticket_data['scanned'] ? 'Yes' : 'No'; ?></td>
        </tr>
        <tr>
            <th>Event Name</th>
            <td><?php echo $ticket_data['event']['name']; ?></td>
        </tr>
        <tr>
            <th>Event Date</th>
            <td><?php echo $ticket_data['event']['event_date']; ?></td>
        </tr>
        <tr>
            <th>Event Time</th>
            <td><?php echo $ticket_data['event']['start_time']; ?> - <?php echo $ticket_data['event']['end_time']; ?></td>
        </tr>
        <tr>
            <th>Event Location</th>
            <td><?php echo $ticket_data['event']['location']; ?></td>
        </tr>
        <tr>
            {!! QrCode::size(200)->generate('https://4ec8-41-80-116-93.ngrok-free.app/api/tickets/' . $ticket_data['id']) !!}
        </tr>
    </table>
</body>
</html>
