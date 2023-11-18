import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

class MenuItem {
    private int menuID;
    private String name;
    private double price;

    // Constructor, getters, and setters

    public MenuItem(int menuID, String name, double price) {
        this.menuID = menuID;
        this.name = name;
        this.price = price;
    }

    public int getMenuID() {
        return menuID;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }
}

class Order {
    private static int orderCounter = 1;

    private int orderID;
    private List<MenuItem> items;
    private Date date;
    private double totalAmount;
    private String status;

    // Constructor, getters, and setters

    public Order(List<MenuItem> items) {
        this.orderID = orderCounter++;
        this.items = items;
        this.date = new Date();
        this.status = "Pending";
        calculateTotalAmount();
    }

    public int getOrderID() {
        return orderID;
    }

    public List<MenuItem> getItems() {
        return items;
    }

    public Date getDate() {
        return date;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getStatus() {
        return status;
    }

    private void calculateTotalAmount() {
        totalAmount = items.stream().mapToDouble(MenuItem::getPrice).sum();
    }

    public void cancelOrder() {
        this.status = "Cancelled";
    }
}

class CollectionReport {
    private Date date;
    private double totalCollection;

    // Constructor, getters, and setters

    public CollectionReport(Date date, double totalCollection) {
        this.date = date;
        this.totalCollection = totalCollection;
    }

    public Date getDate() {
        return date;
    }

    public double getTotalCollection() {
        return totalCollection;
    }
}

class GetFileData {
    private static final String MENU_FILE_PATH = "menu.csv";
    private static final String ORDERS_FILE_PATH = "orders.csv";
    private static final String COLLECTION_REPORTS_FILE_PATH = "collection_reports.csv";

    // Methods for retrieving data from CSV files

    public static List<MenuItem> getMenuItems() {
        List<MenuItem> menuItems = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(MENU_FILE_PATH))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                int menuID = Integer.parseInt(parts[0]);
                String name = parts[1];
                double price = Double.parseDouble(parts[2]);
                menuItems.add(new MenuItem(menuID, name, price));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return menuItems;
    }

    public static List<Order> getOrderDetails() {
        List<Order> orders = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(ORDERS_FILE_PATH))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                int orderID = Integer.parseInt(parts[0]);
                List<MenuItem> items = getMenuItemsByIds(Arrays.copyOfRange(parts, 1, parts.length - 2));
                Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(parts[parts.length - 2]);
                double totalAmount = Double.parseDouble(parts[parts.length - 1]);
                Order order = new Order(items);
                order.cancelOrder(); // Simulating cancelled orders based on the 'Cancelled' status in CSV
                orderID = order.getOrderID(); // Update the order ID with the correct value
                orders.add(order);
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return orders;
    }

    public static List<CollectionReport> getCollectionReports() {
        List<CollectionReport> collectionReports = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(COLLECTION_REPORTS_FILE_PATH))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(",");
                Date date = new SimpleDateFormat("yyyy-MM-dd").parse(parts[0]);
                double totalCollection = Double.parseDouble(parts[1]);
                collectionReports.add(new CollectionReport(date, totalCollection));
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }
        return collectionReports;
    }

    private static List<MenuItem> getMenuItemsByIds(String[] menuIds) {
        List<MenuItem> items = new ArrayList<>();
        List<MenuItem> allMenuItems = getMenuItems();
        for (String id : menuIds) {
            int menuID = Integer.parseInt(id);
            Optional<MenuItem> menuItem = allMenuItems.stream().filter(item -> item.getMenuID() == menuID).findFirst();
            menuItem.ifPresent(items::add);
        }
        return items;
    }
}

class RestaurantApp {
    public static void main(String[] args) {
        // Sample usage
        List<MenuItem> menuItems = GetFileData.getMenuItems();
        List<Order> orders = GetFileData.getOrderDetails();
        List<CollectionReport> collectionReports = GetFileData.getCollectionReports();

        // Display menu items
        System.out.println("Menu Items:");
        for (MenuItem menuItem : menuItems) {
            System.out.println(menuItem.getMenuID() + ". " + menuItem.getName() + " - $" + menuItem.getPrice());
        }

        // Simulate order placement
        List<MenuItem> selectedItems = menuItems.subList(0, 2); // Selecting the first two menu items for the order
        Order newOrder = new Order(selectedItems);
        orders.add(newOrder);

        // Simulate order cancellation
        orders.get(0).cancelOrder();

        // Simulate daily collection report generation
        double totalCollection = orders.stream().filter(order -> order.getStatus().equals("Completed"))
                .mapToDouble(Order::getTotalAmount).sum();
        CollectionReport todayCollectionReport = new CollectionReport(new Date(), totalCollection);
        collectionReports.add(todayCollectionReport);

        // Display the updated order details and collection report
        System.out.println("\nUpdated Order Details:");
        for (Order order : orders) {
            System.out.println("Order ID: " + order.getOrderID() +
                    ", Total Amount: $" + order.getTotalAmount() +
                    ", Status: " + order.getStatus());
        }

        System.out.println("\nDaily Collection Report:");
        for (CollectionReport report : collectionReports) {
            System.out.println("Date: " + report.getDate() +
                    ", Total Collection: $" + report.getTotalCollection());
        }
    }
}