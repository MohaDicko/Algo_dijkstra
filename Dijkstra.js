function dijkstra(graph, start) {
    const distances = {};
    const visited = {};
    const queue = new PriorityQueue();

    // Initialize distances
    for (const vertex in graph) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        queue.enqueue(vertex, distances[vertex]);
    }

    // Process vertices
    while (!queue.isEmpty()) {
        const currentVertex = queue.dequeue().element;
        visited[currentVertex] = true;

        for (const neighbor in graph[currentVertex]) {
            if (!visited[neighbor]) {
                const totalDistance = distances[currentVertex] + graph[currentVertex][neighbor];
                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    queue.enqueue(neighbor, totalDistance);
                }
            }
        }
    }

    return distances;
}

// Priority queue implementation
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Example graph
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

// Test
console.log(dijkstra(graph, 'A'));
