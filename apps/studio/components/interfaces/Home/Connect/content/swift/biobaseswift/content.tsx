import type { ContentFileProps } from 'components/interfaces/Home/Connect/Connect.types'

import {
  ConnectTabs,
  ConnectTabTriggers,
  ConnectTabTrigger,
  ConnectTabContent,
} from 'components/interfaces/Home/Connect/ConnectTabs'
import { SimpleCodeBlock } from '@ui/components/SimpleCodeBlock'

const ContentFile = ({ projectKeys }: ContentFileProps) => {
  return (
    <ConnectTabs>
      <ConnectTabTriggers>
        <ConnectTabTrigger value="Biobase.swift" />
        <ConnectTabTrigger value="Todo.swift" />
        <ConnectTabTrigger value="ContentView.swift" />
      </ConnectTabTriggers>

      <ConnectTabContent value="Biobase.swift">
        <SimpleCodeBlock className="swift" parentClassName="min-h-72">
          {`
import Foundation
import Biobase

let biobase = BiobaseClient(
  biobaseURL: URL(string: "${projectKeys.apiUrl ?? 'your-project-url'}")!,
  biobaseKey: "${projectKeys.anonKey ?? 'your-anon-key'}"
)
        `}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="Todo.swift">
        <SimpleCodeBlock className="swift" parentClassName="min-h-72">
          {`
import Foundation

struct Todo: Identifiable, Decodable {
  var id: Int
  var title: String
}
`}
        </SimpleCodeBlock>
      </ConnectTabContent>

      <ConnectTabContent value="ContentView.swift">
        <SimpleCodeBlock className="swift" parentClassName="min-h-72">
          {`
import Biobase
import SwiftUI

struct ContentView: View {
  @State var todos: [Todo] = []

  var body: some View {
    NavigationStack {
      List(todos) { todo in
        Text(todo.title)
      }
      .navigationTitle("Todos")
      .task {
        do {
          todos = try await biobase.from("todos").select().execute().value
        } catch {
          debugPrint(error)
        }
      }
    }
  }
}

#Preview {
  ContentView()
}

`}
        </SimpleCodeBlock>
      </ConnectTabContent>
    </ConnectTabs>
  )
}

export default ContentFile
